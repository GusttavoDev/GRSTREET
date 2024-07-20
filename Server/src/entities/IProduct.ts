import IColor from "./IColor";
import IReview from "./IReview";

export default interface IProduct {
    id: number,
    name: string,
    description: string,
    category: string,
    sub_category: string,
    reviws: IReview[],
    colors: IColor[],
}