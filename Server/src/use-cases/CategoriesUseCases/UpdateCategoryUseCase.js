"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCategorysUseCase {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async execute(data) {
        return await this.categoriesRepository.update(data);
    }
}
exports.default = CreateCategorysUseCase;
