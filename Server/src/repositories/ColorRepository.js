"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Snowflake_1 = __importDefault(require("../utils/snowflake/Snowflake"));
class ColorRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.snowFlake = new Snowflake_1.default(1, 1);
    }
    async listColor(productId) {
        const colors = await this.prisma.color.findMany({
            where: {
                product_id: productId,
            },
            include: {
                sizes: true, // Incluindo a relação com sizes
            },
        });
        // Garantir que o tipo IColor seja corretamente atribuído, e mapear os tams
        return colors.map((color) => ({
            id: color.id,
            product_id: color.product_id,
            name: color.name,
            price: color.price,
            ncm: color.ncm,
            imposto: color.imposto,
            custo: color.custo,
            actived: color.actived,
            images: color.images,
            sizes: color.sizes.map((size) => ({
                name: size.name,
                quantity: size.quantity, // Certificando que quantity está presente
            })),
        }));
    }
    // Função para adicionar uma nova cor com tamanhos
    async addColor(data) {
        const id = this.snowFlake.generate();
        // Criação do Color com tamanhos
        await this.prisma.color.create({
            data: {
                id,
                product_id: data.product_id,
                name: data.name,
                price: data.price,
                ncm: data.ncm,
                imposto: data.imposto,
                custo: data.custo,
                actived: data.actived,
                images: data.images,
                sizes: {
                    create: data.sizes.map((size) => ({
                        name: size.name,
                        quantity: size.quantity, // Garantindo que os dados correspondam ao tipo Size
                    })),
                },
            },
        });
    }
    async editColor(data) {
        await this.prisma.color.updateMany({
            where: {
                id: data.id,
                product_id: data.product_id, // Corrigido para "product_id"
            },
            data: {
                name: data.name,
                price: data.price,
                ncm: data.ncm,
                imposto: data.imposto,
                custo: data.custo,
                actived: data.actived,
                images: data.images,
            },
        });
    }
    async removeColor(productId, colorName) {
        await this.prisma.color.deleteMany({
            where: {
                product_id: productId,
                name: colorName,
            },
        });
    }
}
exports.default = ColorRepository;
