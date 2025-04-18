"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Snowflake_1 = __importDefault(require("../utils/snowflake/Snowflake"));
class ProductRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.snowFlake = new Snowflake_1.default(1, 1);
    }
    async listProducts() {
        // @ts-ignore
        return await this.prisma.product.findMany({
            include: {
                reviews: true,
                colors: {
                    include: {
                        sizes: true, // Incluir sizes dentro de colors
                    },
                },
            }
        });
    }
    async getProductById(id) {
        // @ts-ignore
        const data = await this.prisma.product.findUnique({
            where: {
                id
            },
            include: {
                reviews: true,
                colors: {
                    include: {
                        sizes: true, // Incluir sizes dentro de colors
                    },
                },
            }
        });
        return data;
    }
    async addProduct(data) {
        var _a, _b;
        const id = this.snowFlake.generate();
        await this.prisma.product.create({
            data: {
                id,
                name: data.name,
                description: data.description,
                images: data.images,
                relatedProducts: (_a = data.relatedProducts) !== null && _a !== void 0 ? _a : [],
                categoryId: data.category,
                subCategoryId: data.sub_category,
                afiliado: data.afiliado,
                destaqued: data.destaqued,
                weight: data.weight,
                height: data.height,
                width: data.width,
                length: data.length,
                declared_value: data.declared_value,
                package_format: data.package_format,
                sku: data.sku,
                colors: {
                    create: data.colors.map(color => ({
                        name: color.name,
                        price: color.price,
                        images: color.images,
                        ncm: color.ncm,
                        imposto: color.imposto,
                        custo: color.custo,
                        actived: color.actived,
                        sizes: {
                            create: color.sizes.map(size => ({
                                name: size.name,
                                quantity: size.quantity,
                            })),
                        },
                    })),
                },
                reviews: ((_b = data.reviews) === null || _b === void 0 ? void 0 : _b.length) ? {
                    create: data.reviews.map(review => ({
                        user: {
                            connect: { id: review.user_id }
                        },
                        comment: review.comment,
                        stars: review.stars
                    }))
                } : undefined
            }
        });
    }
    async editProduct(data) {
        try {
            await this.prisma.product.update({
                where: {
                    id: data.id,
                },
                data: {
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    images: data.images,
                    relatedProducts: data.relatedProducts,
                    categoryId: data.category,
                    subCategoryId: data.sub_category,
                    afiliado: data.afiliado,
                    destaqued: data.destaqued,
                    weight: data.weight,
                    height: data.height,
                    width: data.width,
                    length: data.length,
                    declared_value: data.declared_value,
                    package_format: data.package_format,
                    sku: data.sku,
                    reviews: {
                        upsert: data.reviews.map((review) => ({
                            where: { id: review.id },
                            create: {
                                user: { connect: { id: review.user_id } },
                                comment: review.comment,
                                stars: review.stars,
                            },
                            update: {
                                comment: review.comment,
                                stars: review.stars,
                            },
                        })),
                    },
                    colors: {
                        upsert: data.colors.map((color) => ({
                            where: { id: color.id },
                            create: {
                                name: color.name,
                                price: color.price,
                                images: color.images,
                                ncm: color.ncm,
                                imposto: color.imposto,
                                custo: color.custo,
                                actived: color.actived,
                            },
                            update: {
                                name: color.name,
                                price: color.price,
                                images: color.images,
                                ncm: color.ncm,
                                imposto: color.imposto,
                                custo: color.custo,
                                actived: color.actived,
                            },
                        })),
                    },
                },
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    async removeProduct(id) {
        // Excluir os tamanhos associados à cor
        await this.prisma.size.deleteMany({
            where: { colorId: { in: (await this.prisma.color.findMany({ where: { product_id: id }, select: { id: true } })).map(color => color.id) } }
        });
        // Excluir as cores associadas ao produto
        await this.prisma.color.deleteMany({
            where: { product_id: id }
        });
        // Excluir as outras dependências
        // await this.prisma.productPurchase.deleteMany({
        //     where: { product_id: id }
        // });
        await this.prisma.cartItem.deleteMany({
            where: { productId: id }
        });
        await this.prisma.review.deleteMany({
            where: { product_id: id }
        });
        // Agora, excluir o produto
        await this.prisma.product.delete({
            where: { id }
        });
    }
}
exports.default = ProductRepository;
