import PurchaseRepository from "../../repositories/PurchaseRepository";

export default class UpdateStatusPurchaseUseCase {
    constructor(
        private purchasesRepository: PurchaseRepository
    ){}

    async execute(id: string, status: "PREPARANDO" | "ENVIADO" | "CONCLUIDO" | "CANCELADO"): Promise<void> {
        return await this.purchasesRepository.updateStatus(id, status);
    }
}