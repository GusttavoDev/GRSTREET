import IColor from "./IColor";
import IReview from "./IReview";

export default interface IProduct {
    id: string,
    name: string,
    description: string,
    category: string,
    sub_category: string,
    reviews: IReview[],
    colors: IColor[],
    relatedProducts: string[],  // Corrigido para 'string[]'
    images: string[],  // Certifique-se de que isso também seja 'string[]'
}
