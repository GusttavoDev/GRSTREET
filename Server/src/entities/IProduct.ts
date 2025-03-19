import IColor from "./IColor";
import IReview from "./IReview";

export default interface IProduct {
    id?: string;
    name: string;
    description: string;
    category: string;
    sub_category: string;
    colors: IColor[];
    reviews: IReview[];
    relatedProducts?: string[];
    images: string[];
    afiliado?: string;
    destaqued: boolean;
    weight: string;  // Corrigido de "peso"
    height: string;
    width: string;
    length: string;  // Corrigido de "lenght"
    package_format?: "box" | "roll" | "envelope"; // Novo campo
    declared_value?: string; // Novo campo
    sku?: string; // Novo campo
}
