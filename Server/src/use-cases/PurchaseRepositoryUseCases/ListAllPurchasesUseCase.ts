import IPurchase from "../../entities/IPurchase";
import PurchaseRepository from "../../repositories/PurchaseRepository";

export default class ListAllPurchasesUseCase {
    constructor(
        private purchasesRepository: PurchaseRepository
    ){}

    async execute(): Promise<IPurchase[]> {
        return await this.purchasesRepository.list();
    }
}