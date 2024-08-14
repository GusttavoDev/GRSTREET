import Connection from "@/connection/connection";
import axios from "axios";

const connection = new Connection();

export default class AdminRepository {
    async authentication(email: string, password: string): Promise<{ token: string }> {
        const response = await axios.post(connection.get() + 'admins/auth', {
            email,
            password
        });
        return response.data;
    }
}
