"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Snowflake_1 = __importDefault(require("../utils/snowflake/Snowflake"));
class SubCategoryRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.snowflake = new Snowflake_1.default(1, 1);
    }
    async list(category_id) {
        const data = await this.prisma.subCategory.findMany({
            include: {
                Category: true,
            },
            where: {
                categoryId: category_id
            }
        });
        let result = [];
        data.map(subCategory => (result.push({
            id: subCategory.id,
            category_id: subCategory.categoryId,
            name: subCategory.name
        })));
        return result;
    }
    async create(data) {
        const id = this.snowflake.generate();
        // Check if the category exists
        const categoryExists = await this.prisma.category.findUnique({
            where: { id: data.category_id }
        });
        if (!categoryExists) {
            throw new Error(`Category with ID ${data.category_id} does not exist.`);
        }
        await this.prisma.subCategory.create({
            data: {
                id,
                name: data.name,
                categoryId: data.category_id
            }
        });
    }
    async update(data) {
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
    async delete(id) {
        await this.prisma.subCategory.delete({
            where: {
                id
            }
        });
    }
}
exports.default = SubCategoryRepository;
