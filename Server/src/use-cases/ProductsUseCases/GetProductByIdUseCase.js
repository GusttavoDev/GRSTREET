"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetProductByIdUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(id) {
        return await this.productRepository.getProductById(id);
    }
}
exports.default = GetProductByIdUseCase;
