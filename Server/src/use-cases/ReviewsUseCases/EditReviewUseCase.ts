import IReview from "../../entities/IReview";
import ReviewRepository from "../../repositories/ReviewRepository";

export default class EditReviewUseCase {
    constructor(
        private reviewsRepository: ReviewRepository
    ){}

    async execute(data: IReview): Promise<void> {
        return await this.reviewsRepository.editReview(data);
    }
}