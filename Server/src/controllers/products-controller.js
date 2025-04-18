"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProductsController = exports.listProductsController = exports.getProductByIdController = exports.editProductController = exports.createProductController = void 0;
const ProductRepository_1 = __importDefault(require("../repositories/ProductRepository"));
const CreateProductUseCase_1 = __importDefault(require("../use-cases/ProductsUseCases/CreateProductUseCase"));
const EditProductUseCase_1 = __importDefault(require("../use-cases/ProductsUseCases/EditProductUseCase"));
const GetProductByIdUseCase_1 = __importDefault(require("../use-cases/ProductsUseCases/GetProductByIdUseCase"));
const ListProductsUseCase_1 = __importDefault(require("../use-cases/ProductsUseCases/ListProductsUseCase"));
const RemoveProductUseCase_1 = __importDefault(require("../use-cases/ProductsUseCases/RemoveProductUseCase"));
const productRepository = new ProductRepository_1.default();
const createProductController = new CreateProductUseCase_1.default(productRepository);
exports.createProductController = createProductController;
const editProductController = new EditProductUseCase_1.default(productRepository);
exports.editProductController = editProductController;
const getProductByIdController = new GetProductByIdUseCase_1.default(productRepository);
exports.getProductByIdController = getProductByIdController;
const listProductsController = new ListProductsUseCase_1.default(productRepository);
exports.listProductsController = listProductsController;
const removeProductsController = new RemoveProductUseCase_1.default(productRepository);
exports.removeProductsController = removeProductsController;
