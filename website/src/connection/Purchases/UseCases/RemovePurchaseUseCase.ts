import PurchasesRepository from "../Repositories/PurchasesRepository";

export default class RemovePurchaseUseCase {
    private purchaseRepository = new PurchasesRepository()

    async execute(id: string): Promise<{message: string}> {
        return await this.purchaseRepository.removePurchase(id);
    }
}