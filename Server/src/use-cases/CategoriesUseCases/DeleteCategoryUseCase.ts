import CategoryRepository from "../../repositories/CategoryRepository";

export default class CreateCategorysUseCase {
    constructor(
        private categoriesRepository: CategoryRepository
    ){}

    async execute(category_id: string): Promise<void> {
        return await this.categoriesRepository.delete(category_id);
    }
}