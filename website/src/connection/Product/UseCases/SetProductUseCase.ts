import IProduct from "@/entities/IProduct";
import ProductsRepository from "../Repositories/ProductsRepository";

export default class SetProductUseCase {
    private productsRepository: ProductsRepository = new ProductsRepository();

    async execute(data: Omit<IProduct, 'id'>): Promise<void> {
        return await this.productsRepository.setProduct(data);
    }
}