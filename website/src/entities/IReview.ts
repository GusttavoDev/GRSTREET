export default interface IReview {
    id: string,
    user_id: string,
    product_id: string;
    comment: string,
    stars: 1 | 2 | 3 | 4 | 5,
}