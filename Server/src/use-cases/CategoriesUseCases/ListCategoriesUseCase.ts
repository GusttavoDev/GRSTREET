import ICategory from "../../entities/ICategory";
import CategoryRepository from "../../repositories/CategoryRepository";

export default class ListCategoriesUseCase {
    constructor(
        private categoriesRepository: CategoryRepository
    ){}

    async execute(): Promise<ICategory[]> {
        return await this.categoriesRepository.list();
    }
}