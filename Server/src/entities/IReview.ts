export default interface IReview {
    id: number,
    user_id: number,
    product_id: number;
    comment: string,
    stars: 1 | 2 | 3 | 4 | 5,
}