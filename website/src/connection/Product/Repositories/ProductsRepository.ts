import Connection from "@/connection/connection";

import IProduct from "@/entities/IProduct";
import axios from "axios";

const conneciton = new Connection();

export default class ProductsRepository {
    async getProductById(id: string): Promise<IProduct> {
        const response = await axios.get(conneciton.get() + 'products/' + id);
        return response.data;
    }
}