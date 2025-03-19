"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Snowflake_1 = __importDefault(require("../utils/snowflake/Snowflake"));
class ReviewRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.snowFlake = new Snowflake_1.default(1, 1);
    }
    async listReviews(product_id) {
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
    async getReviewById(id) {
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
    async addReview(data) {
        const id = this.snowFlake.generate();
        await this.prisma.review.create({
            data: Object.assign({ id }, data),
        });
    }
    async editReview(data) {
        await this.prisma.review.update({
            where: {
                id: data.id,
            },
            data,
        });
    }
    async removeReview(id) {
        await this.prisma.review.delete({
            where: {
                id,
            }
        });
    }
}
exports.default = ReviewRepository;
