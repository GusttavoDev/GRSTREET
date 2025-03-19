import IPurchase from "@/entities/IPurchase";
import PurchasesRepository from "../Repositories/PurchasesRepository";

export default class EditPurchaseUseCase {
    private purchaseRepository = new PurchasesRepository()

    async execute(data: IPurchase): Promise<{message: string}> {
        return await this.purchaseRepository.editPurchase(data);
    }
}