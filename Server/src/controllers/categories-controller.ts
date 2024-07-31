import CategoryRepository from "../repositories/CategoryRepository"
import AddCategoryUseCase from "../use-cases/CategoriesUseCases/CreateCategoryUseCase";
import EditCategoryUseCase from "../use-cases/CategoriesUseCases/UpdateCategoryUseCase";
import ListCategorysUseCase from "../use-cases/CategoriesUseCases/ListCategoriesUseCase";
import RemoveCategoryUseCase from "../use-cases/CategoriesUseCases/DeleteCategoryUseCase";

const CategorysRepository = new CategoryRepository();

const addCategoryController = new AddCategoryUseCase(CategorysRepository);
const editCategoryController = new EditCategoryUseCase(CategorysRepository);
const listCategoryController = new ListCategorysUseCase(CategorysRepository);
const removeCategoryController = new RemoveCategoryUseCase(CategorysRepository);

export {
    addCategoryController,
    editCategoryController,
    listCategoryController,
    removeCategoryController
}