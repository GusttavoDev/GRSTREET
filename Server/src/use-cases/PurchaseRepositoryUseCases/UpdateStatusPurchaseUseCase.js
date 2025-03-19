"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateStatusPurchaseUseCase {
    constructor(purchasesRepository) {
        this.purchasesRepository = purchasesRepository;
    }
    async execute(id, status, codigo_postagem, visualizada) {
        return await this.purchasesRepository.updateStatus(id, status, codigo_postagem, visualizada);
    }
}
exports.default = UpdateStatusPurchaseUseCase;
