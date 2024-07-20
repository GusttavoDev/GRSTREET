import { PrismaClient, Purchase } from "@prisma/client";

import Snowflake from "../snowflake/Snowflake";
import IUser from "../entities/IUser";
import IPurchase from "../entities/IPurchase";
export default class UserRepository {
    private snowflake: Snowflake;
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
        this.snowflake = new Snowflake(1, 1);
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

    async create(): Promise<void> {
        const id = this.snowflake.generate();
        console.log(id);
    }
}
