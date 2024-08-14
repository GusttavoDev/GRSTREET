import SubCategoriesRepository from "../Repositories/SubCategoriesRepository";

import ISubCategory from "@/entities/ISubCategory";

export default class ListSubCategoriesUseCase {

    private subCategoriesRepository: SubCategoriesRepository = new SubCategoriesRepository();

    async execute(category: string): Promise<ISubCategory[]> {
        return await this.subCategoriesRepository.list(category);
    }
}