import ReviewRepository from "../../repositories/ReviewRepository";

export default class DeleteReviewUseCase {
    constructor(
        private reviewsRepository: ReviewRepository
    ){}

    async execute(id: number): Promise<void> {
        return await this.reviewsRepository.removeReview(id);
    }
}