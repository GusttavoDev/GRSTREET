import { PrismaClient } from "@prisma/client";

import Snowflake from "../utils/snowflake/Snowflake";
import Jwt from "../utils/jwt/Jwt";

import IUser, { CartItem } from "../entities/IUser";

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
                token: userId,
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
                profile_img: user.profile_img,
                cel_number: user.cel_number,
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
                    purchase_id: purchase.id,
                }
            });

            const products = productsPurchaseList.map(product => ({
                id: product.purchase_id,
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
                color: item.color,
                size:  item.size,
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
                    cel_number: user.cel_number,
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
                        purchase_id: purchase.id,
                    }
                });

                const products = productsPurchaseList.map(product => ({
                    id: product.purchase_id,
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
                    color: item.color,
                    size:  item.size,
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
    
        try {
            const userData: any = {
                id: id,
                token,
                email: header.email,
                password: header.password,
                name: personal_data.name,
                cel_number: personal_data.cel_number,
                country: addres.country,
                state: addres.state,
                city: addres.city,
                neighborhood: addres.neighborhood,
                street: addres.street,
                number: addres.number ? Number(addres.number) : 0,
                cep: parseInt(addres.cep.toString()),
            };
    
            // Adiciona cpf se fornecido, ou define como null
            if (personal_data.cpf) {
                userData.cpf = personal_data.cpf;
            } else {
                userData.cpf = null;
            }
    
            await this.prisma.user.create({
                data: userData,
            });
    
            await this.prisma.cart.create({
                data: {
                    userId: id,
                    total: 0,
                }
            });
        } catch (error) {
            console.log(error);
        }
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
    async updateAddress(id: string, newAddress: Partial<IUser['addres']>): Promise<void> {
        // const decoded = await this.jwt.verifyToken(id);
    
        // Converte o valor de 'number' para inteiro (caso seja uma string)
        
        const updatedAddress = {
            ...newAddress,
            number: newAddress.number ? parseInt(newAddress.number.toString()) : 0,  // Garantir que seja um número
            cep: newAddress.cep ? parseInt(newAddress.cep.toString()) : 0,  // Garantir que seja um número
        };
    
        // if (!decoded.id) {
        //     throw new Error('User ID is not available');
        // }
    
        await this.prisma.user.update({
            where: {
                id: id, // Garantir que o ID é passado corretamente
            },
            data: {
                country: updatedAddress.country,
                state: updatedAddress.state,
                city: updatedAddress.city,
                neighborhood: updatedAddress.neighborhood,
                street: updatedAddress.street,
                number: updatedAddress.number,  // Número agora é um inteiro
                cep: updatedAddress.cep,
            },
        });
    }
    

    async updatePersonalData(id: string, newPersonalData: Partial<IUser['personal_data']>): Promise<void> {
        // const decoded = await this.jwt.verifyToken(token);
        await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name: newPersonalData.name,
                profile_img: newPersonalData.profile_img,
                cel_number: newPersonalData.cel_number,
            },
        });
    }

    async updatePassword(id: string, newPassword: string): Promise<void> {
        // const decoded = await this.jwt.verifyToken(token);
        // const newToken = await this.jwt.create({
        //     ...decoded,
        //     password: newPassword,
        // })
        await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                // token: newToken,
                password: newPassword,
            },
        });
    }

    async updateEmail(id: string, newEmail: string): Promise<void> {
        // const decoded = await this.jwt.verifyToken(token);
        // const newToken = await this.jwt.create({
        //     ...decoded,
        //     email: newEmail,
        // })
        await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                // token: newToken,
                email: newEmail,
            },
        });
    }
    async updateCart(token: string, items: CartItem[]): Promise<void> {
        // Decodifica o token para obter o ID do usuário
        const decoded = await this.jwt.verifyToken(token);
    
        try {
            // Recupera o carrinho do usuário
            let cart = await this.prisma.cart.findFirst({
                where: {
                    userId: decoded.id,
                }
            });
    
            // Se não tiver carrinho, cria um novo
            if (!cart) {
                return;
            }
    
            // Remove os itens que não estão mais no carrinho
            await this.prisma.cartItem.deleteMany({
                where: {
                    cartId: cart.id,
                    NOT: {
                        productId: { in: items.map(item => item.product_id) },
                    }
                }
            });
    
            // Para cada item no carrinho, verificar se já existe com a MESMA cor e tamanho
            await Promise.all(items.map(async (item) => {
                const existingItem = await this.prisma.cartItem.findFirst({
                    where: {
                        cartId: cart.id,
                        productId: item.product_id,
                        color: item.color,  // Agora verifica a cor
                        size: item.size     // Agora verifica o tamanho
                    }
                });
    
                if (existingItem) {
                    // Se o item já existe, atualiza a quantidade e o preço
                    await this.prisma.cartItem.update({
                        where: {
                            id: existingItem.id,  // Atualiza o item específico
                        },
                        data: {
                            quantity: item.quantity,  // Atualiza a quantidade
                            price: item.price,  // Atualiza o preço
                        },
                    });
                } else {
                    // Se o item não existe, cria um novo item no carrinho
                    await this.prisma.cartItem.create({
                        data: {
                            cartId: cart.id,
                            productId: item.product_id,
                            quantity: item.quantity,
                            price: item.price,
                            color: item.color,
                            size: item.size,
                        }
                    });
                }
            }));
    
            // Atualiza o total do carrinho
            const total = await this.prisma.cartItem.aggregate({
                where: { cartId: cart.id },
                _sum: { price: true },
            });
    
            // Atualiza o total do carrinho no banco de dados
            await this.prisma.cart.update({
                where: { id: cart.id },
                data: { total: total._sum.price ?? 0 }
            });

        } catch (error) {
            console.log(error);
        }
    }
    
}