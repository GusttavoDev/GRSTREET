import IProduct from "../../entities/IProduct";
import ProductRepository from "../../repositories/ProductRepository";

export default class EditProductUseCase {
    constructor(
        private productRepository: ProductRepository
    ){}

    async execute(data: IProduct): Promise<void> {
        return await this.productRepository.editProduct(data);
    }
}