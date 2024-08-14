import IProduct from "@/entities/IProduct";
import ProductsRepository from "../Repositories/ProductsRepository";

export default class ListProductsUseCase {
    private productsRepository: ProductsRepository = new ProductsRepository();

    async execute(): Promise<IProduct[]> {
        return await this.productsRepository.listProductsUseCase();
    }
}