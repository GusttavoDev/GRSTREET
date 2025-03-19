"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteReviewUseCase {
    constructor(reviewsRepository) {
        this.reviewsRepository = reviewsRepository;
    }
    async execute(id) {
        return await this.reviewsRepository.removeReview(id);
    }
}
exports.default = DeleteReviewUseCase;
