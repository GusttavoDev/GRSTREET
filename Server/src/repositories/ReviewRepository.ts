import { PrismaClient } from "@prisma/client";
import IReview from "../entities/IReview";
import Snowflake from "../utils/snowflake/Snowflake";

export default class ReviewRepository {

    private prisma: PrismaClient;
    private snowFlake: Snowflake;

    constructor(){
        this.prisma = new PrismaClient();
        this.snowFlake = new Snowflake(1, 1);
    }

    async listReviews(product_id: number): Promise<IReview[]> {
        // @ts-ignore
        return await this.prisma.review.findMany({
            where: {
                product_id,
            },
            include: {
                user: true,
                product: true
            }
        });
    }

    async getReviewById(id: number): Promise<IReview | null> {
        // @ts-ignore
        return await this.prisma.review.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
                product: true
            }
        });
    }

    async addReview(data: Omit<IReview, "id">): Promise<void> {
        const id = Number(this.snowFlake.generate());
        await this.prisma.review.create({
            data: {
                id,
                ...data,
            },
        });
    }

    async editReview(data: IReview): Promise<void> {
        await this.prisma.review.update({
            where: {
                id: data.id,
            },
            data,
        });
    }

    async removeReview(id: number): Promise<void> {
        await this.prisma.review.delete({
            where: {
                id,
            }
        });
    }
}
