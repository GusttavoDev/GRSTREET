// Interface do produto comprado
export interface IProductPurchase {
    purchase_id: string;  // Adiciona o campo purchase_id
    product_id: string;   // Adiciona o campo product_id
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    sub_category: string;
    color: string;
    quantity: number;
    size: string;
    weight: string;  // Corrigido de "peso"
    height: string;
    width: string;
    length: string;  // Corrigido de "lenght"
    package_format?: "box" | "roll" | "envelope"; // Novo campo
    declared_value?: string; // Novo campo
    sku?: string; // Novo campo
}

// Interface da compra
export default interface IPurchase {
    id: string,           // ID da compra
    user_id: string,      // ID do usuário
    UserName: string,
    cpf: string | null,
    cel_number: string,
    email: string,
    country: string,
    state: string,
    city : string,
    neighborhood: string,
    street: string,
    number: number,
    cep: number,
    products: IProductPurchase[], // Lista de produtos comprados (relacionamento com ProductPurchase)
    payment_method: string,
    payment_status: string,
    payment_id: string,
    value: string,        // A string está mais próxima do Prisma que usa "String" para valores monetários
    codigo_postagem: string,
    date: Date,           // Tipo de data
    status: "PREPARANDO" | "ENVIADO" | "CONCLUIDO" | "CANCELADO", // Enum no Prisma
    vendedor: string,
    frete: string,
    visualizada: boolean  // Tipo booleano
}
