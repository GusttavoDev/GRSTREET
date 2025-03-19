import IPurchase from "./IPurchase";

interface Header {
    id: string,
    token: string,
    email: string,
    password: string,
}

interface PersonalData {
    name: string,
    cpf?: string,
    cel_number: string,
    profile_img: string,
}
interface Addres {
    country: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
    number: number,
    cep: number,
}

export interface CartItem {
    product_id: string,
    quantity: number,
    price: number,
    color: string,
    size: string,
}

export interface Cart {
    items: CartItem[],
    total: number,
}

export default interface IUser {
    header: Header,
    personal_data: PersonalData,
    addres: Addres,
    purchases: IPurchase[],
    cart: Cart,
}
