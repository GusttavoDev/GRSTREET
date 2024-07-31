import IPurchase from "../../entities/IPurchase";
import PurchaseRepository from "../../repositories/PurchaseRepository";

export default class EditPurchasesUseCase {
    constructor(
        private purchasesRepository: PurchaseRepository
    ){}

    async execute(data: IPurchase): Promise<void> {
        return await this.purchasesRepository.update(data);
    }
}