import Connection from "@/connection/connection";

import IProduct from "@/entities/IProduct";
import axios from "axios";

const connection = new Connection();

export default class ProductsRepository {
    async listProductsUseCase(): Promise<IProduct[]> {
        const response = (await axios.get(connection.get() + 'products/')).data;
        return response;
    }

    async getProductById(id: string): Promise<IProduct> {
        const response = await axios.get(connection.get() + 'products/' + id);
        return response.data;
    }
    async setProduct(data: Omit<IProduct, 'id'>): Promise<void> {
        await axios.post(connection.get() + 'products/', data);
    }
}