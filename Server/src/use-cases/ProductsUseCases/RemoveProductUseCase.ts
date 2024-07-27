import ProductRepository from "../../repositories/ProductRepository";

export default class RemoveProductUseCase {
    constructor(
        private productReposiroty: ProductRepository
    ){}

    async execute(id: number): Promise<void> {
        return await this.productReposiroty.removeProduct(id);
    }
}