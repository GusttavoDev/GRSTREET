"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EditPurchasesUseCase {
    constructor(purchasesRepository) {
        this.purchasesRepository = purchasesRepository;
    }
    async execute(data) {
        return await this.purchasesRepository.update(data);
    }
}
exports.default = EditPurchasesUseCase;
