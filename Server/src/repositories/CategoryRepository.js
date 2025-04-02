"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Snowflake_1 = __importDefault(require("../utils/snowflake/Snowflake"));
class CategoryRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.snowflake = new Snowflake_1.default(1, 1);
    }
    async list() {
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
    async create(data) {
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
    async update(data) {
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
    async delete(id) {
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
exports.default = CategoryRepository;
