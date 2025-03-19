import { PrismaClient } from "@prisma/client";
import Snowflake from "../utils/snowflake/Snowflake";
import IColor, { ISize } from "../entities/IColor";

export default class ColorRepository {
    private prisma: PrismaClient;
    private snowFlake: Snowflake;

    constructor() {
        this.prisma = new PrismaClient();
        this.snowFlake = new Snowflake(1, 1);
    }

    async listColor(productId: string): Promise<IColor[]> {
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
    async addColor(data: Omit<IColor, "id">): Promise<void> {
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
                    create: data.sizes.map((size: ISize) => ({
                        name: size.name,
                        quantity: size.quantity, // Garantindo que os dados correspondam ao tipo Size
                    })),
                },
            },
        });
    }

    async editColor(data: IColor): Promise<void> {
        await this.prisma.color.updateMany({
            where: {
                id: data.id,
                product_id: data.product_id,  // Corrigido para "product_id"
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

    async removeColor(productId: string, colorName: string): Promise<void> {
        await this.prisma.color.deleteMany({
            where: {
                product_id: productId,
                name: colorName,
            },
        });
    }
}
