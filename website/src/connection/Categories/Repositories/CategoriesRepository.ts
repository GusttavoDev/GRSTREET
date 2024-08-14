import Connection from "@/connection/connection";

import ICategory from "@/entities/ICategory";

import axios from "axios";

const conneciton = new Connection();

export default class CategoriesRepository {
    async list(): Promise<ICategory[]> {
        const response = await axios.get(conneciton.get() + 'categories');
        return response.data;
    }
}