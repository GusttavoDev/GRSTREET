import PurchasesRepository from "../Repositories/PurchasesRepository";

export default class UpdatePaymentMethodUseCase {
    private purchaseRepository = new PurchasesRepository()

    async execute(id: string, payment_method: string, payment_id: string, payment_status: string): Promise<{message: string}> {
        return await this.purchaseRepository.updatePaymentMethod(id, payment_method, payment_id, payment_status);
    }
}