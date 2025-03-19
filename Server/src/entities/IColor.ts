export interface ISize {
    name: string;
    quantity: number;
}

export default interface IColor {
    product_id: string;
    id: string;
    name: string;
    price: number;
    ncm: string | null;
    imposto: string | null;
    custo: string | null;
    actived: boolean;
    images: string[];
    sizes: ISize[]; // Array de tamanhos com nome e quantidade
}
