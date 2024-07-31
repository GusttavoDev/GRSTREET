import ISubCategory from "../../entities/ISubCategory";
import SubCategoryRepository from "../../repositories/SubCategoryRepository";

export default class EditSubCategoryUseCase {
    constructor(
        private subCategoriesRepository: SubCategoryRepository
    ){}

    async execute(data: ISubCategory): Promise<void> {
        return await this.subCategoriesRepository.update(data);
    }
}
