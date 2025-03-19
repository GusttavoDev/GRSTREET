"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeletePurchaseUseCase {
    constructor(purchasesRepository) {
        this.purchasesRepository = purchasesRepository;
    }
    async execute(id) {
        return await this.purchasesRepository.delete(id);
    }
}
exports.default = DeletePurchaseUseCase;
