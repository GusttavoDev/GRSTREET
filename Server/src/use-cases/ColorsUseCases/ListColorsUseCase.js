"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListColorsUseCase {
    constructor(colorRepository) {
        this.colorRepository = colorRepository;
    }
    async execute(productId) {
        return await this.colorRepository.listColor(productId);
    }
}
exports.default = ListColorsUseCase;
