import Connection from "@/connection/connection";
import type { IPaymentProduct } from "@/entities/IProduct";
import type IPurchase from "@/entities/IPurchase";
import axios from "axios";

const connection = new Connection();

export default class PaymentsRepository {
  async checkout(
      token: string,
      products: IPaymentProduct[], // Aceita um array de produtos
      payer: { name: string; email: string },
      updatedItems: any[],
      purchaseData: Omit<IPurchase, "id"> | null,
  ): Promise<any> {
    try {
      const response = await axios.post(connection.get() + 'payment/', {
        token,
        items: products,
        payer,
        updatedItems,
        purchaseData
      });

      return response.data; // Retorna os dados da API
    } catch (error: any) {
      console.error("Erro ao processar pagamento:", error);
      throw new Error(error.response?.data?.message || "Erro desconhecido");
    }
  }
}
