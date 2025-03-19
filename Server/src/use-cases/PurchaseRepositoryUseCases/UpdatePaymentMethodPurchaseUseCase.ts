import PurchaseRepository from "../../repositories/PurchaseRepository";

export default class UpdatePaymentMethodPurchaseUseCase {
    constructor(
        private purchasesRepository: PurchaseRepository
    ){}

    async execute(id: string, payment_method: string, payment_id: string, payment_status: string): Promise<void> {
        return await this.purchasesRepository.updatePaymentMethod(id, payment_method, payment_id, payment_status);
    }
}
