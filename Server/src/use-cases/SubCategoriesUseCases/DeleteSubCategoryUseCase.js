"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteSubCategoryUseCase {
    constructor(subCategoriesRepository) {
        this.subCategoriesRepository = subCategoriesRepository;
    }
    async execute(subCategory_id) {
        return await this.subCategoriesRepository.delete(subCategory_id);
    }
}
exports.default = DeleteSubCategoryUseCase;
