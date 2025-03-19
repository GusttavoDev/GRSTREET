"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListPurchasesUseCase {
    constructor(purchasesRepository) {
        this.purchasesRepository = purchasesRepository;
    }
    async execute(id) {
        return await this.purchasesRepository.listByUserId(id);
    }
}
exports.default = ListPurchasesUseCase;
