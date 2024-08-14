import IColor from "./IColor";
import IReview from "./IReview";
// IProduct.ts
export default interface IProduct {
    id?: string;
    name: string;
    description: string;
    category: string;
    sub_category: string;
    colors: IColor[];
    reviews: IReview[];
    relatedProducts?: string[];
    images: string[]; // Atualize o tipo aqui para string[]
}
