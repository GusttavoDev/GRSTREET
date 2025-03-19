import PurchasesRepository from "../Repositories/PurchasesRepository";

export default class UpdatePurchaseStatusUseCase {
    private purchaseRepository = new PurchasesRepository();
        
    async execute(id: string, status: "PREPARANDO" | "ENVIADO" | "CONCLUIDO" | "CANCELADO", codigo_postagem: string, visualizada: boolean): Promise<{message: string}> {
        return await this.purchaseRepository.updatePurchaseStatus(id, status, codigo_postagem, visualizada);
    }
}