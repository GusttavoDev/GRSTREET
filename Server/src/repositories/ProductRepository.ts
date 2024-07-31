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

    async getProductById(id: number): Promise<IProduct> {
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
        const id = Number(this.snowFlake.generate());
        await this.prisma.product.create({
            data: {
                id,
                name: data.name,
                description: data.description,
                images: data.images,
                relatedProducts: data.relatedProducts,
                categoryId: data.category, // Mapeando category para categoryId
                subCategoryId: data.sub_category, // Mapeando sub_category para subCategoryId
                reviews: {
                    create: data.reviews
                },
                colors: {
                    create: data.colors
                }
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

    async removeProduct(id: number): Promise<void> {
        await this.prisma.product.delete({
            where: {
                id
            }
        });
    }
}
