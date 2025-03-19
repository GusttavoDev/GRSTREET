import IPurchase from "@/entities/IPurchase";
import PurchasesRepository from "../Repositories/PurchasesRepository";

export default class ListAllPurchaseUseCase {
    private purchaseRepository = new PurchasesRepository()

    async execute(): Promise<IPurchase[]> {
        return await this.purchaseRepository.listAllPurchases();
    }
}