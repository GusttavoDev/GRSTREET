import IReview from "../../entities/IReview";
import ReviewRepository from "../../repositories/ReviewRepository";

export default class ListReviewsUseCase {
    constructor(
        private reviewsRepository: ReviewRepository
    ){}

    async execute(product_id: number): Promise<IReview[]> {
        return await this.reviewsRepository.listReviews(product_id);
    }
}