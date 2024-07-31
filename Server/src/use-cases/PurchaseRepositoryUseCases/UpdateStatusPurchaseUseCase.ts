import PurchaseRepository from "../../repositories/PurchaseRepository";

export default class UpdateStatusPurchaseUseCase {
    constructor(
        private purchasesRepository: PurchaseRepository
    ){}

    async execute(id: number, status: "PREPARANDO" | "ENVIADO" | "CONCLUIDO" | "CANCELADO"): Promise<void> {
        return await this.purchasesRepository.updateStatus(id, status);
    }
}