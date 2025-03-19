"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EditSubCategoryUseCase {
    constructor(subCategoriesRepository) {
        this.subCategoriesRepository = subCategoriesRepository;
    }
    async execute(data) {
        return await this.subCategoriesRepository.update(data);
    }
}
exports.default = EditSubCategoryUseCase;
