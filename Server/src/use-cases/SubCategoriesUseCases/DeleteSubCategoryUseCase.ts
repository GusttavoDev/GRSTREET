import SubCategoryRepository from "../../repositories/SubCategoryRepository";

export default class DeleteSubCategoryUseCase {
    constructor(
        private subCategoriesRepository: SubCategoryRepository
    ){}

    async execute(subCategory_id: number): Promise<void> {
        return await this.subCategoriesRepository.delete(subCategory_id);
    }
}