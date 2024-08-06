import IPurchase from "./IPurchase";

interface Header {
    id: string,
    token: string,
    email: string,
    password: string,
}

interface PersonalData {
    name: string,
    cpf: number,
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

interface CartItem {
    product_id: string,
    quantity: number,
    price: number,
}

interface Cart {
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
