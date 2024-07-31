import { PrismaClient } from "@prisma/client";
import ISubCategory from "../entities/ISubCategory";
import Snowflake from "../utils/snowflake/Snowflake";

export default class SubCategoryRepository {
    private prisma: PrismaClient;
    private snowflake: Snowflake;

    constructor(){
        this.prisma = new PrismaClient();
        this.snowflake = new Snowflake(1, 1);
    }

    async list(category_id: number): Promise<ISubCategory[]> {
        const data = await this.prisma.subCategory.findMany({
            include: {
                Category: true,
            },
            where: {
                categoryId: category_id
            }
        });

        let result: ISubCategory[] = [];

        data.map(subCategory => (
            result.push({
                id: subCategory.id,
                category_id: subCategory.categoryId,
                name: subCategory.name
            })
        ));
        
        return result;
    }

    async create(data: Omit<ISubCategory, "id">): Promise<void> {
        const id = Number(this.snowflake.generate());
        await this.prisma.subCategory.create({
            data: {
                id,
                name: data.name,
                categoryId: data.category_id
            }
        });
    }

    async update(data: ISubCategory): Promise<void> {
        await this.prisma.subCategory.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                categoryId: data.category_id
            }
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.subCategory.delete({
            where: {
                id
            }
        });
    }
}
