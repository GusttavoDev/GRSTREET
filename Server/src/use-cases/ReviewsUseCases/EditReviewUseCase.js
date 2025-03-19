"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EditReviewUseCase {
    constructor(reviewsRepository) {
        this.reviewsRepository = reviewsRepository;
    }
    async execute(data) {
        return await this.reviewsRepository.editReview(data);
    }
}
exports.default = EditReviewUseCase;
