"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListReviewsUseCase {
    constructor(reviewsRepository) {
        this.reviewsRepository = reviewsRepository;
    }
    async execute(product_id) {
        return await this.reviewsRepository.listReviews(product_id);
    }
}
exports.default = ListReviewsUseCase;
