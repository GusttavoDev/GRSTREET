import ICategory from "@/entities/ICategory";
import CategoriesRepository from "../Repositories/CategoriesRepository";

export default class AddCategoriesUseCase {
    private categoriesRepository = new CategoriesRepository;

    async execute(data: Omit<ICategory, 'id'>): Promise<void> {
        return await this.categoriesRepository.add(data);
    }
}