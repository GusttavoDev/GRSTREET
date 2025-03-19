"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListProductsUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute() {
        return await this.productRepository.listProducts();
    }
}
exports.default = ListProductsUseCase;
