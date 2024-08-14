import { PrismaClient } from "@prisma/client";

import Snowflake from "../utils/snowflake/Snowflake";
import Jwt from "../utils/jwt/Jwt";

import IUser from "../entities/IUser";

export default class UserRepository {
    private snowflake: Snowflake;
    private prisma: PrismaClient;
    private jwt: Jwt;

    constructor() {
        this.prisma = new PrismaClient();
        this.snowflake = new Snowflake(1, 1);
        this.jwt = new Jwt();
    }

    async authenticate(email: string, password: string): Promise<string | null> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (user && user.password === password) {
            return user.token;
        }

        return null;
    }

    async get(userId: string): Promise<IUser | undefined> {
        const user = await this.prisma.user.findFirst({
            where: {
                id: userId,
            }
        });

        if (!user) return undefined;

        const cart = await this.prisma.cart.findFirst({
            where: {
                userId: user.id,
            }
        });

        let creatingUser: IUser = {
            header: {
                id: user.id,
                token: user.token,
                email: user.email,
                password: user.password,
            },
            personal_data: {
                name: user.name,
                cpf: user.cpf,
                profile_img: user.profile_img,
            },
            addres: {
                country: user.country,
                state: user.state,
                city: user.city,
                neighborhood: user.neighborhood,
                street: user.street,
                number: user.number,
                cep: user.cep,
            },
            purchases: [],
            cart: {
                items: [],
                total: 0,
            },
        };

        const purchasesList = await this.prisma.purchase.findMany({
            where: {
                userId: user.id,
            }
        });

        // @ts-ignore
        creatingUser.purchases = await Promise.all(purchasesList.map(async purchase => {
            const productsPurchaseList = await this.prisma.productPurchase.findMany({
                where: {
                    id: purchase.id,
                }
            });

            const products = productsPurchaseList.map(product => ({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category,
                sub_category: product.sub_category,
                color: product.color,
                quantity: product.quantity,
            }));

            return {
                user_id: purchase.userId,
                id: purchase.id,
                payment_method: purchase.payment_method,
                status: purchase.status,
                products: products,
            };
        }));

        if (cart) {
            const cartItems = await this.prisma.cartItem.findMany({
                where: {
                    cartId: cart.id,
                }
            });

            creatingUser.cart.items = cartItems.map(item => ({
                product_id: item.productId,
                quantity: item.quantity,
                price: item.price,
            }));

            creatingUser.cart.total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        }

        return creatingUser;
    }

    async list(): Promise<IUser[]> {
        const users: IUser[] = [];

        const userList = await this.prisma.user.findMany();

        await Promise.all(userList.map(async user => {
            const cart = await this.prisma.cart.findFirst({
                where: {
                    userId: user.id,
                }
            });

            let creatingUser: IUser = {
                header: {
                    id: user.id,
                    token: user.token,
                    email: user.email,
                    password: user.password,
                },
                personal_data: {
                    name: user.name,
                    cpf: user.cpf,
                    profile_img: user.profile_img,
                },
                addres: {
                    country: user.country,
                    state: user.state,
                    city: user.city,
                    neighborhood: user.neighborhood,
                    street: user.street,
                    number: user.number,
                    cep: user.cep,
                },
                purchases: [],
                cart: {
                    items: [],
                    total: 0,
                },
            };

            const purchasesList = await this.prisma.purchase.findMany({
                where: {
                    userId: user.id,
                }
            });

            // @ts-ignore
            creatingUser.purchases = await Promise.all(purchasesList.map(async purchase => {
                const productsPurchaseList = await this.prisma.productPurchase.findMany({
                    where: {
                        id: purchase.id,
                    }
                });

                const products = productsPurchaseList.map(product => ({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                    category: product.category,
                    sub_category: product.sub_category,
                    color: product.color,
                    quantity: product.quantity,
                }));

                return {
                    user_id: purchase.userId,
                    id: purchase.id,
                    payment_method: purchase.payment_method,
                    status: purchase.status,
                    products: products,
                };
            }));

            if (cart) {
                const cartItems = await this.prisma.cartItem.findMany({
                    where: {
                        cartId: cart.id,
                    }
                });

                creatingUser.cart.items = cartItems.map(item => ({
                    product_id: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                }));

                creatingUser.cart.total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
            }

            users.push(creatingUser);
        }));

        return users;
    }

    async create({
        header,
        personal_data,
        addres
    }: IUser): Promise<void> {
        const id = this.snowflake.generate();
        const token = await this.jwt.create({
            ...header,
            name: personal_data.name,
        });
    
        const userData = {
            id: id,
            token,
            email: header.email,
            password: header.password,
            name: personal_data.name,
            cpf: personal_data.cpf,
            country: addres.country,
            state: addres.state,
            city: addres.city,
            neighborhood: addres.neighborhood,
            street: addres.street,
            number: addres.number,
            cep: addres.cep,
        };
    
        await this.prisma.user.create({
            data: userData,
        });
    
        await this.prisma.cart.create({
            data: {
                userId: id,
                total: 0,
            }
        });
    }    

    async delete(token: string): Promise<void> {
        const decoded = await this.jwt.verifyToken(token);
        await this.prisma.cart.deleteMany({
            where: {
                userId: decoded.id,
            },
        });
        await this.prisma.user.delete({
            where: {
                id: decoded.id,
            },
        });
    }

    async updateAddress(token: string, newAddress: Partial<IUser['addres']>): Promise<void> {
        const decoded = await this.jwt.verifyToken(token);
        await this.prisma.user.update({
            where: {
                id: decoded.id,
            },
            data: {
                country: newAddress.country,
                state: newAddress.state,
                city: newAddress.city,
                neighborhood: newAddress.neighborhood,
                street: newAddress.street,
                number: newAddress.number,
                cep: newAddress.cep,
            },
        });
    }

    async updatePersonalData(token: string, newPersonalData: Partial<IUser['personal_data']>): Promise<void> {
        const decoded = await this.jwt.verifyToken(token);
        await this.prisma.user.update({
            where: {
                id: decoded.id,
            },
            data: {
                name: newPersonalData.name,
                profile_img: newPersonalData.profile_img,
                cpf: newPersonalData.cpf,
            },
        });
    }

    async updatePassword(token: string, newPassword: string): Promise<void> {
        const decoded = await this.jwt.verifyToken(token);
        const newToken = await this.jwt.create({
            ...decoded,
            password: newPassword,
        })
        await this.prisma.user.update({
            where: {
                id: decoded.id,
            },
            data: {
                token: newToken,
                password: newPassword,
            },
        });
    }

    async updateEmail(token: string, newEmail: string): Promise<void> {
        const decoded = await this.jwt.verifyToken(token);
        const newToken = await this.jwt.create({
            ...decoded,
            email: newEmail,
        })
        await this.prisma.user.update({
            where: {
                id: decoded.id,
            },
            data: {
                token: newToken,
                email: newEmail,
            },
        });
    }
}