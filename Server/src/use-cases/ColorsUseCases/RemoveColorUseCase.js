"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RemoveColorUseCase {
    constructor(colorRepository) {
        this.colorRepository = colorRepository;
    }
    async execute(productId, colorName) {
        return await this.colorRepository.removeColor(productId, colorName);
    }
}
exports.default = RemoveColorUseCase;
