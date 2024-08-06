import ProductsRepository from "../Repositories/ProductsRepository";

import IProduct from "@/entities/IProduct";

export default class GetProductByIdUseCase {

    private productsRepository: ProductsRepository = new ProductsRepository();

    async execute(id: string): Promise<IProduct> {
        return await this.productsRepository.getProductById(id);
    }
}