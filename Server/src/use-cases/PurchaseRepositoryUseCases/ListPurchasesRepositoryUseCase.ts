import IPurchase from "../../entities/IPurchase";
import PurchaseRepository from "../../repositories/PurchaseRepository";

export default class ListPurchasesUseCase {
    constructor(
        private purchasesRepository: PurchaseRepository
    ){}

    async execute(id: string): Promise<IPurchase[]> {
        return await this.purchasesRepository.listByUserId(id);
    }
}