import axios from "axios";
import Connection from "@/connection/connection";
import IPurchase from "@/entities/IPurchase";

const connection = new Connection();

export default class PurchasesRepository {
    // Criar uma nova compra
    async createPurchase(purchase: Omit<IPurchase, "id">): Promise<{ message: string }> {
        const response = await axios.post(connection.get() + "purchases", purchase);
        return response.data;
        
    }

    async listAllPurchases(): Promise<IPurchase[]> {
        const response = await axios.get(connection.get() + "purchases/");
        return response.data;
    }

    // Listar todas as compras
    async listPurchases(id: string): Promise<IPurchase[]> {
        const response = await axios.get(connection.get() + "purchases/"+id);
        return response.data;
    }

    // Editar uma compra existente
    async editPurchase(purchase: IPurchase): Promise<{ message: string }> {
        const response = await axios.put(connection.get() + "purchases", purchase);
        return response.data;
    }

    // Atualizar status de uma compra
    async updatePurchaseStatus(id: string, status: "PREPARANDO" | "ENVIADO" | "CONCLUIDO" | "CANCELADO", codigo_postagem: string, visualizada: boolean): Promise<{ message: string }> {
        const response = await axios.patch(connection.get() + "purchases/status", { id, status, codigo_postagem, visualizada });
        return response.data;
    }

    // Atualizar método de pagamento de uma compra
    async updatePaymentMethod(id: string, payment_method: string, payment_id: string, payment_status: string): Promise<{ message: string }> {
        const response = await axios.patch(connection.get() + "purchases/payment-method", { id, payment_method, payment_id, payment_status });
        return response.data;
    }

    // Deletar uma compra
    async removePurchase(id: string): Promise<{ message: string }> {
        const response = await axios.delete(connection.get() + "purchases", { data: { id } });
        return response.data;
    }
}
