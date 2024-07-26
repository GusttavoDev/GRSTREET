import ProductRepository from "../repositories/ProductRepository"

import CreateProductUseCase from "../use-cases/ProductsUseCases/CreateProductUseCase";
import EditProductUseCase from "../use-cases/ProductsUseCases/EditProductUseCase";
import GetProductByIdUseCase from "../use-cases/ProductsUseCases/GetProductByIdUseCase";
import ListProductsUseCase from "../use-cases/ProductsUseCases/ListProductsUseCase";
import RemoveProductUseCase from "../use-cases/ProductsUseCases/RemoveProductUseCase";

const productRepository = new ProductRepository();

const createProductController = new CreateProductUseCase(productRepository);
const editProductController = new EditProductUseCase(productRepository);
const getProductByIdController = new GetProductByIdUseCase(productRepository);
const listProductsController = new ListProductsUseCase(productRepository);
const removeProductsController = new RemoveProductUseCase(productRepository);


export {
    createProductController,
    editProductController,
    getProductByIdController,
    listProductsController,
    removeProductsController
}