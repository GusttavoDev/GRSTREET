"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddColorUseCase {
    constructor(colorRepository) {
        this.colorRepository = colorRepository;
    }
    async execute(color) {
        return await this.colorRepository.addColor(color);
    }
}
exports.default = AddColorUseCase;
