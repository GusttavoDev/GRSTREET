import ReviewRepository from "../../repositories/ReviewRepository";

export default class DeleteReviewUseCase {
    constructor(
        private reviewsRepository: ReviewRepository
    ){}

    async execute(id: string): Promise<void> {
        return await this.reviewsRepository.removeReview(id);
    }
}