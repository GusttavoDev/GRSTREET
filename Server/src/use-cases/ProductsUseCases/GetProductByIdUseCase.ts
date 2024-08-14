import IProduct from "../../entities/IProduct";
import ProductRepository from "../../repositories/ProductRepository";

export default class GetProductByIdUseCase {
    constructor(
        private productRepository: ProductRepository
    ){}

    async execute(id: string): Promise<IProduct> {
        return await this.productRepository.getProductById(id);
    }
}