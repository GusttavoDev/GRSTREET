import IPurchase from "./IPurchase";

interface Header {
    id: number,
    token: BigInt,
    email: string,
    password: string,
}

interface PersonalData {
    name: string,
    cpf: number,
    profile_img: string,
}

interface Adress {
    country: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
    number: number,
    cep: number,
}

export default interface IUser {
    header: Header,
    personal_data: PersonalData,
    adress: Adress,
    purchases: IPurchase[] | [],
}