"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreatePurchasesUseCase {
    constructor(purchasesRepository) {
        this.purchasesRepository = purchasesRepository;
    }
    async execute(data) {
        return await this.purchasesRepository.create(data);
    }
}
exports.default = CreatePurchasesUseCase;
