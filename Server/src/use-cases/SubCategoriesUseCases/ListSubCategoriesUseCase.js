"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListSubCategoriesUseCase {
    constructor(subCategoriesRepository) {
        this.subCategoriesRepository = subCategoriesRepository;
    }
    async execute(category_id) {
        return await this.subCategoriesRepository.list(category_id);
    }
}
exports.default = ListSubCategoriesUseCase;
