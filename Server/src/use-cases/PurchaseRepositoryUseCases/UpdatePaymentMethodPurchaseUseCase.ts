import PurchaseRepository from "../../repositories/PurchaseRepository";

export default class UpdatePaymentMethodPurchaseUseCase {
    constructor(
        private purchasesRepository: PurchaseRepository
    ){}

    async execute(id: number, payment_method: string): Promise<void> {
        return await this.purchasesRepository.updatePaymentMethod(id, payment_method);
    }
}
