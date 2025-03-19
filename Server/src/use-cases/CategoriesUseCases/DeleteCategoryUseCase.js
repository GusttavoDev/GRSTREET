"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCategorysUseCase {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async execute(category_id) {
        return await this.categoriesRepository.delete(category_id);
    }
}
exports.default = CreateCategorysUseCase;
