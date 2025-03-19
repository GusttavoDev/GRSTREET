import Connection from "@/connection/connection";

import ICategory from "@/entities/ICategory";

import axios from "axios";

const conneciton = new Connection();

export default class CategoriesRepository {
    async list(): Promise<ICategory[]> {
        const response = await axios.get(conneciton.get() + 'categories');
        return response.data;
    }
    async add(data: Omit<ICategory, 'id'>): Promise<void> {
        const response = await axios.post(conneciton.get() + 'categories', data);
        return response.data;
    }
    async edit(data: ICategory): Promise<void> {
        const response = await axios.put(conneciton.get() + 'categories', data);
        return response.data
    }
    async delete(id: string): Promise<void> {
        const response = await axios.delete(conneciton.get() + 'categories', {
            data: {id}
        });
        return response.data;
    }
}