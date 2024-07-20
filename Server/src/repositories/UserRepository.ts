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

    async get(userId: number): Promise<IUser | undefined> {
        const user = await this.prisma.user.findFirst({
            where: {
                id: userId,
            }
        });

        if(!user) return undefined;

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
            adress: {
                country: user.country,
                state: user.state,
                city: user.city,
                neighborhood: user.neighborhood,
                street: user.street,
                number: user.number,
                cep: user.cep,
            },
            purchases: [],
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

        return creatingUser;
    }

    async list(): Promise<IUser[]> {
        const users: IUser[] = [];

        const userList = await this.prisma.user.findMany();

        await Promise.all(userList.map(async user => {
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
                adress: {
                    country: user.country,
                    state: user.state,
                    city: user.city,
                    neighborhood: user.neighborhood,
                    street: user.street,
                    number: user.number,
                    cep: user.cep,
                },
                purchases: [],
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

            users.push(creatingUser);
        }));

        return users;
    }

    

    async create({
        header,
        personal_data,
        adress
    }: IUser): Promise<void> {
        const id = this.snowflake.generate();
        const token = await this.jwt.create({
            ...header,
            name: personal_data.name,
        });
    
        const userData = {
            id: Number(id),
            token,
            email: header.email,
            password: header.password,
            name: personal_data.name,
            cpf: personal_data.cpf,
            country: adress.country,
            state: adress.state,
            city: adress.city,
            neighborhood: adress.neighborhood,
            street: adress.street,
            number: adress.number,
            cep: adress.cep,
        };

        await this.prisma.user.create({
            data: userData,
        });
    }

    async delete(token: string): Promise<void> {
        const decoded = await this.jwt.verifyToken(token);
        await this.prisma.user.delete({
            where: {
                id: decoded.id,
            },
        });
    }

    async updateAddress(token: string, newAddress: Partial<IUser['adress']>): Promise<void> {
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
            password: newEmail,
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
