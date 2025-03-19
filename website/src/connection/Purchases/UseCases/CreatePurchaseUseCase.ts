import IPurchase from "@/entities/IPurchase";
import PurchasesRepository from "../Repositories/PurchasesRepository";

export default class CreatePurchaseUseCase {
    private purchasesRepository = new PurchasesRepository();

    async execute(purchase: Omit<IPurchase, 'id'>): Promise<{message: string}> {
        return await this.purchasesRepository.createPurchase(purchase);
    }
}