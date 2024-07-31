import IReview from "../../entities/IReview";
import ReviewRepository from "../../repositories/ReviewRepository";

export default class CreateReviewUseCase {
    constructor(
        private reviewsRepository: ReviewRepository
    ){}

    async execute(data: Omit<IReview, "id">): Promise<void> {
        return await this.reviewsRepository.addReview(data);
    }
}