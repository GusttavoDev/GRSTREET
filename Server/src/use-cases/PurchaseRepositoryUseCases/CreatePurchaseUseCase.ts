import IPurchase from "../../entities/IPurchase";
import PurchaseRepository from "../../repositories/PurchaseRepository";

export default class CreatePurchasesUseCase {
    constructor(
        private purchasesRepository: PurchaseRepository
    ){}

    async execute(data: Omit<IPurchase, "id">): Promise<void> {
        return await this.purchasesRepository.create(data);
    }
}