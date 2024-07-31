import { Category } from "@prisma/client";
import CategoryRepository from "../../repositories/CategoryRepository";

export default class CreateCategorysUseCase {
    constructor(
        private categoriesRepository: CategoryRepository
    ){}

    async execute(data: Category): Promise<void> {
        return await this.categoriesRepository.update(data);
    }
}