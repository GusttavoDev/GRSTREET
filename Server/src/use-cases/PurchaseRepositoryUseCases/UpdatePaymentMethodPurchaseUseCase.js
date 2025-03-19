"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdatePaymentMethodPurchaseUseCase {
    constructor(purchasesRepository) {
        this.purchasesRepository = purchasesRepository;
    }
    async execute(id, payment_method, payment_id, payment_status) {
        return await this.purchasesRepository.updatePaymentMethod(id, payment_method, payment_id, payment_status);
    }
}
exports.default = UpdatePaymentMethodPurchaseUseCase;
