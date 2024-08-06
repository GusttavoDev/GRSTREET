export interface IProductPurchase {
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string,
    sub_category: string,
    color: string,
    quantity: number,
}

export default interface IPurchase {
    user_id: string,
    id: string,
    products: IProductPurchase[],
    payment_method: string,
    date: Date,
    status: "PREPARANDO" | "ENVIADO" | "CONCLUIDO" | "CANCELADO",
}