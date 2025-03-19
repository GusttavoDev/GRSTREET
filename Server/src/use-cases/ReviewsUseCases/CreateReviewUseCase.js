"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateReviewUseCase {
    constructor(reviewsRepository) {
        this.reviewsRepository = reviewsRepository;
    }
    async execute(data) {
        return await this.reviewsRepository.addReview(data);
    }
}
exports.default = CreateReviewUseCase;
