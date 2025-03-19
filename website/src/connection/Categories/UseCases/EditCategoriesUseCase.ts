import ICategory from "@/entities/ICategory";
import CategoriesRepository from "../Repositories/CategoriesRepository";

export default class EditCategoriesUseCase {
    private categoriesRepository = new CategoriesRepository;

    async execute(data: ICategory): Promise<void> {
        return await this.categoriesRepository.edit(data);
    }
}