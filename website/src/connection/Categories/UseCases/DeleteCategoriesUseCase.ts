import CategoriesRepository from "../Repositories/CategoriesRepository";

export default class DeleteCategoriesUseCase {
    private categoriesRepository = new CategoriesRepository();

    async execute(id: string): Promise<void> {
        return await this.categoriesRepository.delete(id);
    }
}