import ICategory from "../../entities/ICategory";
import CategoryRepository from "../../repositories/CategoryRepository";

export default class CreateCategorysUseCase {
    constructor(
        private categoriesRepository: CategoryRepository
    ){}

    async execute(data: Omit<ICategory, "id">): Promise<void> {
        return await this.categoriesRepository.create(data);
    }
}