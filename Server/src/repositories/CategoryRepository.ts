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
        const data;

        return await data
    }
}