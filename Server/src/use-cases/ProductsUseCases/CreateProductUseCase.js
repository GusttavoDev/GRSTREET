"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(data) {
        return await this.productRepository.addProduct(data);
    }
}
exports.default = CreateProductUseCase;
