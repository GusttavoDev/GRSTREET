import ProductRepository from "../../repositories/ProductRepository";

export default class RemoveProductUseCase {
    constructor(
        private productReposiroty: ProductRepository
    ){}

    async execute(id: string): Promise<void> {
        return await this.productReposiroty.removeProduct(id);
    }
}