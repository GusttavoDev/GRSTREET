import IReview from "../../entities/IReview";
import ReviewRepository from "../../repositories/ReviewRepository";

export default class GetReviewUseCase {
    constructor(
        private reviewsRepository: ReviewRepository
    ){}

    async execute(id: string): Promise<IReview | null> {
        return await this.reviewsRepository.getReviewById(id);
    }
}