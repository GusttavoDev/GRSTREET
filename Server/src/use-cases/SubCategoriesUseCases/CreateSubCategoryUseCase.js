"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateSubCategoryUseCase {
    constructor(subCategoriesRepository) {
        this.subCategoriesRepository = subCategoriesRepository;
    }
    async execute(data) {
        return await this.subCategoriesRepository.create(data);
    }
}
exports.default = CreateSubCategoryUseCase;
