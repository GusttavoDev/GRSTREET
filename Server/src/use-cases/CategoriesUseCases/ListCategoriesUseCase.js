"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListCategoriesUseCase {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async execute() {
        return await this.categoriesRepository.list();
    }
}
exports.default = ListCategoriesUseCase;
