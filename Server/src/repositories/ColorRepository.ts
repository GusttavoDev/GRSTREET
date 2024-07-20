import { PrismaClient } from "@prisma/client";
import Snowflake from "../utils/snowflake/Snowflake";
import IColor from "../entities/IColor";

export default class ColorRepository {

    private prisma: PrismaClient;
    private snowFlake: Snowflake;

    constructor(){
        this.prisma = new PrismaClient();
        this.snowFlake = new Snowflake(1, 1);
    }

    async listColor(product_id: number): Promise<IColor[]> {
        return await this.prisma.color.findMany({
            where: {
                product_id,
            }
        })
    }

    async addColor(data: Omit<IColor, "id">): Promise<void> {
        const id = Number(this.snowFlake.generate());
        await this.prisma.color.create({
            data: {
                id,
                ...data,
            },
        })
    }

    async editColor(data: IColor): Promise<void> {
        await this.prisma.color.updateMany({
            where: {
                id: data.id,
                product_id: data.id,
            },
            data,
        })
    }

    async removeColor(product_id: number, color_name: string): Promise<void> {
        await this.prisma.color.deleteMany({
            where: {
                product_id,
                name: color_name,
            }
        })
    }
}