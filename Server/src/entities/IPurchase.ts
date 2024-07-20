interface IProductPurchase {
    id: number,
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
    user_id: number,
    id: number,
    products: IProductPurchase[],
    payment_method: string,
    status: "PREPARANDO" | "ENVIADO" | "CONCLUIDO" | "CANCELADO",
}