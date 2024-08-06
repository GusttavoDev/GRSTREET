import { PrismaClient } from "@prisma/client";
import IPurchase, { IProductPurchase } from "../entities/IPurchase";
import Snowflake from "../utils/snowflake/Snowflake";

export default class PurchaseRepository {
    private prisma: PrismaClient;
    private snowflake: Snowflake;

    constructor(){
        this.prisma = new PrismaClient();
        this.snowflake = new Snowflake(1, 1);
    }

    async list(): Promise<IPurchase[]> {
        const data = await this.prisma.purchase.findMany({
            include: {
                products: true,
            }
        });

        return data.map(purchase => ({
            id: purchase.id,
            user_id: purchase.userId,
            products: purchase.products,
            payment_method: purchase.payment_method,
            date: purchase.date,
            status: purchase.status as "PREPARANDO" | "ENVIADO" | "CONCLUIDO" | "CANCELADO"
        }));
    }

    async create(data: Omit<IPurchase, "id">): Promise<void> {
        const id = this.snowflake.generate();
        await this.prisma.purchase.create({
            data: {
                id,
                userId: data.user_id,
                payment_method: data.payment_method,
                date: data.date,
                status: data.status,
                products: {
                    create: data.products.map((product: IProductPurchase) => ({
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        stock: product.stock,
                        category: product.category,
                        sub_category: product.sub_category,
                        color: product.color,
                        quantity: product.quantity
                    }))
                }
            }
        });
    }

    async update(data: IPurchase): Promise<void> {
        await this.prisma.purchase.update({
            where: {
                id: data.id
            },
            data: {
                userId: data.user_id,
                payment_method: data.payment_method,
                date: data.date,
                status: data.status,
                products: {
                    deleteMany: {},
                    create: data.products.map((product: IProductPurchase) => ({
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        stock: product.stock,
                        category: product.category,
                        sub_category: product.sub_category,
                        color: product.color,
                        quantity: product.quantity
                    }))
                }
            }
        });
    }

    async updateStatus(id: string, status: "PREPARANDO" | "ENVIADO" | "CONCLUIDO" | "CANCELADO"): Promise<void> {
        await this.prisma.purchase.update({
            where: { id },
            data: { status }
        });
    }

    async updatePaymentMethod(id: string, payment_method: string): Promise<void> {
        await this.prisma.purchase.update({
            where: { id },
            data: { payment_method }
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.purchase.delete({
            where: {
                id
            }
        });
    }
}
