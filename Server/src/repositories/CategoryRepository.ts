import { PrismaClient } from "@prisma/client";
import ICategory from "../entities/ICategory";
import Snowflake from "../utils/snowflake/Snowflake";

export default class CategoryRepository {
    private prisma: PrismaClient;
    private snowflake: Snowflake;

    constructor(){
        this.prisma = new PrismaClient();
        this.snowflake = new Snowflake(1, 1);
    }

    async list(): Promise<ICategory[]> {
        const data = await this.prisma.category.findMany({
            include: {
                subcategories: true
            }
        });

        return data.map(category => ({
            id: category.id,
            name: category.name,
            image: category.image,
            destaqued: category.destaqued,
            subcategories: category.subcategories
        }));
    }

    async create(data: Omit<ICategory, "id">): Promise<void> {
        const id = this.snowflake.generate();
        await this.prisma.category.create({
            data: {
                id,
                name: data.name,
                image: data.image,
                destaqued: data.destaqued,
            }
        });
    }

    async update(data: ICategory): Promise<void> {
        await this.prisma.category.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                image: data.image,
                destaqued: data.destaqued,
            }
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.subCategory.deleteMany({
            where: {
                categoryId: id
            }
        });
        await this.prisma.category.delete({
            where: {
                id
            }
        });
    }
}
