import IColor from "./IColor";
import IReview from "./IReview";

export default interface IProduct {
    id: number,
    name: string,
    description: string,
    category: number,
    sub_category: number,
    reviews: IReview[],
    colors: IColor[],
    relatedProducts: number[],
    images: string[],
}