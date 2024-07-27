import IProduct from "../../entities/IProduct";
import ProductRepository from "../../repositories/ProductRepository";

export default class ListProductsUseCase {
    constructor(
        private productRepository: ProductRepository
    ){}

    async execute(): Promise<IProduct[]> {
        return await this.productRepository.listProducts();
    }
}