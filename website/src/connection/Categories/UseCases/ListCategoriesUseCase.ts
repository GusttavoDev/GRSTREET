import CategoriesRepository from "../Repositories/CategoriesRepository";

import ICategory from "@/entities/ICategory";

export default class ListCategoriesUseCase {

    private categoriesRepository: CategoriesRepository = new CategoriesRepository();

    async execute(): Promise<ICategory[]> {
        return await this.categoriesRepository.list();
    }
}