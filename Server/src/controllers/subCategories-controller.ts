import SubCategoryRepository from "../repositories/SubCategoryRepository"
import CreateSubCategoryUseCase from "../use-cases/SubCategoriesUseCases/CreateSubCategoryUseCase";
import DeleteSubCategoryUseCase from "../use-cases/SubCategoriesUseCases/DeleteSubCategoryUseCase";
import EditSubCategoryUseCase from "../use-cases/SubCategoriesUseCases/EditSubCategoryUseCase";
import ListSubCategoriesUseCase from "../use-cases/SubCategoriesUseCases/ListSubCategoriesUseCase";

const SubCategorysRepository = new SubCategoryRepository();

const addSubCategoryController = new CreateSubCategoryUseCase(SubCategorysRepository);
const editSubCategoryController = new EditSubCategoryUseCase(SubCategorysRepository);
const listSubCategoryController = new ListSubCategoriesUseCase(SubCategorysRepository);
const removeSubCategoryController = new DeleteSubCategoryUseCase(SubCategorysRepository);

export {
    addSubCategoryController,
    editSubCategoryController,
    listSubCategoryController,
    removeSubCategoryController
}