import Connection from "@/connection/connection";

import IConfig from "@/entities/IConfig";

import axios from "axios";

const conneciton = new Connection();

export default class ConfigRepository {
    async list(): Promise<IConfig[]> {
        const response = await axios.get(conneciton.get() + 'config');
        return response.data;
    }
    async update(data: IConfig): Promise<Object> {
        const response = await axios.put(conneciton.get() + 'config/0', data);
        return response;
    }
}