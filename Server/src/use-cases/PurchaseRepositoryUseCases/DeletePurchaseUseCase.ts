import PurchaseRepository from "../../repositories/PurchaseRepository";

export default class DeletePurchaseUseCase {
    constructor(
        private purchasesRepository: PurchaseRepository
    ){}

    async execute(id: string): Promise<void> {
        return await this.purchasesRepository.delete(id);
    }
}