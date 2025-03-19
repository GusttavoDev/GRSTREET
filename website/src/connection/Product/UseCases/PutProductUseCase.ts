import IProduct from "@/entities/IProduct";
import ProductsRepository from "../Repositories/ProductsRepository";

export default class PutProductUseCase {
    private productsRepository: ProductsRepository = new ProductsRepository();

    async execute(data: IProduct): Promise<void> {
        return await this.productsRepository.putProduct(data);
    }
}