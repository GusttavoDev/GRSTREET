import type { IPaymentProduct } from "@/entities/IProduct";
import PaymentsRepository from "../Repositorires/PaymentsRepository";
import type IPurchase from "@/entities/IPurchase";

export default class PaymentsCheckoutUseCase {

  private paymentsRepository: PaymentsRepository = new PaymentsRepository()

  async execute(
      token: string,
      products: IPaymentProduct[], // Aceita um array de produtos
      payer: { name: string; email: string },
      updatedItems: any[],
      purchaseData: Omit<IPurchase, "id"> | null,
    ): Promise<any> {
      return await this.paymentsRepository.checkout(token, products, payer, updatedItems, purchaseData)
    }
}