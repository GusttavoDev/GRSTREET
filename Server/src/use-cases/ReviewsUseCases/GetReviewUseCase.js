"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetReviewUseCase {
    constructor(reviewsRepository) {
        this.reviewsRepository = reviewsRepository;
    }
    async execute(id) {
        return await this.reviewsRepository.getReviewById(id);
    }
}
exports.default = GetReviewUseCase;
