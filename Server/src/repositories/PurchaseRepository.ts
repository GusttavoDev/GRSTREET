import { Prisma, PrismaClient } from "@prisma/client";
import IPurchase, { IProductPurchase } from "../entities/IPurchase";
import Snowflake from "../utils/snowflake/Snowflake";
import Jwt from "../utils/jwt/Jwt";

export default class PurchaseRepository {
    private prisma: PrismaClient;
    private snowflake: Snowflake;
    private jwt: Jwt;

    constructor(){
        this.prisma = new PrismaClient();
        this.snowflake = new Snowflake(1, 1);
        this.jwt = new Jwt();
    }

    async list(): Promise<IPurchase[]> {
        const data = await this.prisma.purchase.findMany({
            include: {
                products: true, // Inclui os produtos associados à compra
            }
        });
    
        return data.map(purchase => ({
            id: purchase.id,
            user_id: purchase.userId,
            UserName: purchase.userName,
            cel_number: purchase.cel_number,
            cep: purchase.cep,
            city: purchase.city,
            country: purchase.country,
            email: purchase.email,
            neighborhood: purchase.neighborhood,
            number: purchase.number,
            state: purchase.state,
            street: purchase.street,
            cpf: purchase.cpf,
            products: purchase.products.map(product => ({
                purchase_id: purchase.id,
                product_id: product.product_id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category,
                sub_category: product.sub_category,
                color: product.color,
                quantity: product.quantity,
                size: product.size,
                weight: product.weight,
                height: product.height,
                width: product.width,
                length: product.length,
                package_format: product.package_format as "box" | "roll" | "envelope", // Garantindo que o valor seja válido
                declared_value: product.declared_value,
                sku: product.sku,
            })),
            payment_method: purchase.payment_method,
            payment_id: purchase.payment_id,
            payment_status: purchase.payment_status,
            codigo_postagem: purchase.codigo_postagem,
            date: purchase.date,
            frete: purchase.frete,
            value: purchase.value,
            vendedor: purchase.vendedor,
            visualizada: purchase.visualizada,
            status: purchase.status as "PREPARANDO" | "ENVIADO" | "CONCLUIDO" | "CANCELADO",
        }));
    }

    async listByUserId(userId: string): Promise<IPurchase[]> {
        const data = await this.prisma.purchase.findMany({
            where: {
                userId: userId, // Filtra pela ID do usuário
            },
            include: {
                products: true, // Inclui os produtos associados à compra
            }
        });
        // console.log(data)
    
        return data.map(purchase => ({
            id: purchase.id,
            user_id: purchase.userId,
            UserName: purchase.userName,
            cel_number: purchase.cel_number,
            cep: purchase.cep,
            city: purchase.city,
            country: purchase.country,
            email: purchase.email,
            neighborhood: purchase.neighborhood,
            number: purchase.number,
            state: purchase.state,
            street: purchase.street,
            cpf: purchase.cpf,
            products: purchase.products.map(product => ({
                purchase_id: purchase.id,
                product_id: product.product_id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category,
                sub_category: product.sub_category,
                color: product.color,
                quantity: product.quantity,
                size: product.size,
                weight: product.weight,
                height: product.height,
                width: product.width,
                length: product.length,
                package_format: product.package_format as "box" | "roll" | "envelope", // Garantindo que o valor seja válido
                declared_value: product.declared_value,
                sku: product.sku,
            })),
            payment_method: purchase.payment_method,
            payment_id: purchase.payment_id,
            payment_status: purchase.payment_status,
            codigo_postagem: purchase.codigo_postagem,
            date: purchase.date,
            frete: purchase.frete,
            value: purchase.value,
            vendedor: purchase.vendedor,
            visualizada: purchase.visualizada,
            status: purchase.status as "PREPARANDO" | "ENVIADO" | "CONCLUIDO" | "CANCELADO",
        }));
    }

    
    async userExists(userId: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({
          where: { id: userId },
        });
        return user !== null;
      }
    
async create(data: Omit<IPurchase, "id">): Promise<void> {
    const id = this.snowflake.generate();

    // Verifica se o id gerado já existe
    const existingPurchase = await this.prisma.purchase.findUnique({
        where: { id },
    });

    if (existingPurchase) {
        throw new Error(`Erro: ID ${id} já existe.`);
    }

    try {
        // Criação da compra
        await this.prisma.purchase.create({
            data: {
                id,
                userId: data.user_id,
                userName: data.UserName,
                cel_number: data.cel_number,
                cep: data.cep,
                city: data.city,
                country: data.country,
                email: data.email,
                neighborhood: data.neighborhood,
                number: data.number,
                state: data.state,
                street: data.street,
                cpf: data.cpf,
                payment_method: data.payment_method,
                payment_id: data.payment_id,
                payment_status: data.payment_status,
                date: new Date(data.date),
                status: data.status,
                frete: data.frete,
                codigo_postagem: data.codigo_postagem,
                vendedor: data.vendedor,
                visualizada: data.visualizada,
                value: String(new Prisma.Decimal(data.value)),
                products: {
                    create: data.products.map((product: IProductPurchase) => ({
                        product_id: product.product_id,  // Referência ao produto
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        stock: product.stock,
                        category: product.category,
                        sub_category: product.sub_category,
                        color: product.color,
                        quantity: product.quantity,
                        size: product.size,
                        weight: product.weight,  // Corrigido de "peso"
                        height: product.height,
                        width: product.width,
                        length: product.length,  // Corrigido de "lenght"
                        package_format: product.package_format, // Novo campo
                        declared_value: product.declared_value, // Novo campo
                        sku: product.sku, // Novo campo
                    })),
                },                
            },
        });
        

        console.log("Compra criada com sucesso!");
    } catch (error) {
        console.error("Erro ao criar a compra:", error);
        throw new Error("Erro ao processar a compra");
    }
}

async update(data: IPurchase): Promise<void> {
    await this.prisma.purchase.update({
        where: {
            id: data.id
        },
        data: {
            userId: data.user_id,
            userName: data.UserName,
            cel_number: data.cel_number,
            cep: data.cep,
            city: data.city,
            country: data.country,
            email: data.email,
            neighborhood: data.neighborhood,
            number: data.number,
            state: data.state,
            street: data.street,
            cpf: data.cpf,
            payment_method: data.payment_method,
            payment_id: data.payment_id,
            payment_status: data.payment_status,
            vendedor: data.vendedor,
            visualizada: data.visualizada,
            date: data.date,
            status: data.status,
            products: {
                deleteMany: {},  // Deleta os produtos antigos
                create: data.products.map((product: IProductPurchase) => ({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                    category: product.category,
                    sub_category: product.sub_category,
                    color: product.color,
                    quantity: product.quantity,
                    product_id: product.product_id,  // Adiciona o product_id
                    purchase_id: data.id,  // Adiciona o purchase_id
                    size: product.size,
                    weight: product.weight,  // Corrigido de "peso"
                    height: product.height,
                    width: product.width,
                    length: product.length,  // Corrigido de "lenght"
                    package_format: product.package_format, // Novo campo
                    declared_value: product.declared_value, // Novo campo
                    sku: product.sku, // Novo campo
                }))
            }
        }
    });
}


    async updateStatus(id: string, status: "PREPARANDO" | "ENVIADO" | "CONCLUIDO" | "CANCELADO", codigo_postagem: string, visualizada: boolean): Promise<void> {
        await this.prisma.purchase.update({
            where: { id },
            data: { status, codigo_postagem, visualizada }
        });
    }

    async updatePaymentMethod(id: string, payment_method: string, payment_id: string, payment_status: string): Promise<void> {
        await this.prisma.purchase.update({
            where: { id },
            data: { payment_method, payment_id, payment_status }
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.purchase.delete({
            where: {
                id
            }
        });
    }
}
