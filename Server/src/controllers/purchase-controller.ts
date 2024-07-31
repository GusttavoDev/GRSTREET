import PurchaseRepository from "../repositories/PurchaseRepository"
import CreatePurchasesUseCase from "../use-cases/PurchaseRepositoryUseCases/CreatePurchaseUseCase";
import DeletePurchaseUseCase from "../use-cases/PurchaseRepositoryUseCases/DeletePurchaseUseCase";
import EditPurchasesUseCase from "../use-cases/PurchaseRepositoryUseCases/EditPurchaseUseCase";
import ListPurchasesUseCase from "../use-cases/PurchaseRepositoryUseCases/ListPurchasesRepositoryUseCase";
import UpdatePaymentMethodPurchaseUseCase from "../use-cases/PurchaseRepositoryUseCases/UpdatePaymentMethodPurchaseUseCase";
import UpdateStatusPurchaseUseCase from "../use-cases/PurchaseRepositoryUseCases/UpdateStatusPurchaseUseCase";

const PurchasesRepository = new PurchaseRepository();

const addPurchaseController = new CreatePurchasesUseCase(PurchasesRepository);
const editPurchaseController = new EditPurchasesUseCase(PurchasesRepository);
const listPurchaseController = new ListPurchasesUseCase(PurchasesRepository);
const removePurchaseController = new DeletePurchaseUseCase(PurchasesRepository);
const updatePaymentMethodPurchaseController = new UpdatePaymentMethodPurchaseUseCase(PurchasesRepository);
const updateStatusMethodPurchaseController = new UpdateStatusPurchaseUseCase(PurchasesRepository);

export {
    addPurchaseController,
    editPurchaseController,
    listPurchaseController,
    removePurchaseController,
    updatePaymentMethodPurchaseController,
    updateStatusMethodPurchaseController
}