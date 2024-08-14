import Connection from "@/connection/connection";

import ISubCategory from "@/entities/ISubCategory";

import axios from "axios";

const conneciton = new Connection();

export default class SubCategoriesRepository {
    async list(category: string): Promise<ISubCategory[]> {
        return (await axios.get(conneciton.get() + `subcategories/${category}`)).data;
    }
}