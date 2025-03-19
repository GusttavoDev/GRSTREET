"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListAllPurchasesUseCase {
    constructor(purchasesRepository) {
        this.purchasesRepository = purchasesRepository;
    }
    async execute() {
        return await this.purchasesRepository.list();
    }
}
exports.default = ListAllPurchasesUseCase;
