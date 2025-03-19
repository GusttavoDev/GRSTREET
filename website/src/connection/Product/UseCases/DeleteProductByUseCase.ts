import ProductsRepository from "../Repositories/ProductsRepository";

export default class DeleteProductByIdUseCase {

    private productsRepository: ProductsRepository = new ProductsRepository();

    async execute(id: string): Promise<void> {
        return await this.productsRepository.deleteProduct(id);
    }
}