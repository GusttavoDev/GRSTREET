import ISubCategory from "../../entities/ISubCategory";
import SubCategoryRepository from "../../repositories/SubCategoryRepository";

export default class CreateSubCategoryUseCase {
    constructor(
        private subCategoriesRepository: SubCategoryRepository
    ){}

    async execute(data: Omit<ISubCategory, "id">): Promise<void> {
        return await this.subCategoriesRepository.create(data);
    }
}