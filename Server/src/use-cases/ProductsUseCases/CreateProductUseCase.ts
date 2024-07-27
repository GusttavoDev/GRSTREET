import IProduct from "../../entities/IProduct";
import ProductRepository from "../../repositories/ProductRepository";

export default class CreateProductUseCase {
    constructor(
        private productRepository: ProductRepository
    ){}

    async execute(data: Omit<IProduct, "id">): Promise<void> {
        return await this.productRepository.addProduct(data);
    }
}