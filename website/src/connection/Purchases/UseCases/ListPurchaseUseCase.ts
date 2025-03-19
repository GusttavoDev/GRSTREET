import IPurchase from "@/entities/IPurchase";
import PurchasesRepository from "../Repositories/PurchasesRepository";

export default class ListPurchaseUseCase {
    private purchaseRepository = new PurchasesRepository()

    async execute(id: string): Promise<IPurchase[]> {
        return await this.purchaseRepository.listPurchases(id);
    }
}