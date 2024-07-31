import ISubCategory from "../../entities/ISubCategory";
import SubCategoryRepository from "../../repositories/SubCategoryRepository";

export default class ListSubCategoriesUseCase {
    constructor(
        private subCategoriesRepository: SubCategoryRepository
    ){}

    async execute(category_id: number): Promise<ISubCategory[]> {
        return await this.subCategoriesRepository.list(category_id);
    }
}