import { PrismaClient } from "@prisma/client";
import IProduct from "../entities/IProduct";
import Snowflake from "../utils/snowflake/Snowflake";

export default class ProductRepository {
    private prisma: PrismaClient;
    private snowFlake: Snowflake;

    constructor(){
        this.prisma = new PrismaClient();
        this.snowFlake = new Snowflake(1, 1);
    }

    async listProducts(): Promise<IProduct[]> {
        // @ts-ignore
        return await this.prisma.product.findMany({
            include: {
                reviews: true,
                colors: true
            }
        });
    }

    async getProductById(id: string): Promise<IProduct> {
        // @ts-ignore
        return await this.prisma.product.findUnique({
            where: {
                id
            },
            include: {
                reviews: true,
                colors: true
            }
        });
    }

    async addProduct(data: Omit<IProduct, "id">): Promise<void> {
        const id = this.snowFlake.generate();
        await this.prisma.product.create({
            data: {
                id,
                name: data.name,
                description: data.description,
                images: data.images,
                relatedProducts: data.relatedProducts,
                categoryId: data.category,
                subCategoryId: data.sub_category,
                // Condicional para reviews
                reviews: data.reviews ? {
                    create: data.reviews.map(review => ({
                        user: {
                            connect: { id: review.user_id }
                        },
                        comment: review.comment,
                        stars: review.stars
                    }))
                } : undefined,
                // Condicional para colors
                colors: data.colors ? {
                    create: data.colors.map(color => ({
                        name: color.name,
                        price: color.price,
                        stock: color.stock,
                        images: color.images
                    }))
                } : undefined
            }
        });
    }     

    async editProduct(data: IProduct): Promise<void> {
        await this.prisma.product.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                description: data.description,
                images: data.images,
                relatedProducts: data.relatedProducts,
                categoryId: data.category, // Mapeando category para categoryId
                subCategoryId: data.sub_category, // Mapeando sub_category para subCategoryId
                reviews: {
                    upsert: data.reviews.map(review => ({
                        where: { id: review.id },
                        create: review,
                        update: review
                    }))
                },
                colors: {
                    upsert: data.colors.map(color => ({
                        where: { id: color.id },
                        create: color,
                        update: color
                    }))
                }
            }
        });
    }

    async removeProduct(id: string): Promise<void> {
        await this.prisma.product.delete({
            where: {
                id
            }
        });
    }
}
