"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EditProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(data) {
        return await this.productRepository.editProduct(data);
    }
}
exports.default = EditProductUseCase;
