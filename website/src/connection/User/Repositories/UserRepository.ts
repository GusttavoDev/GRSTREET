import Connection from "@/connection/connection";
import IUser, { CartItem } from "@/entities/IUser";
import axios from "axios";

const connection = new Connection();

export default class UserRepository {
    // Autenticar usuário
    async authenticate(email: string, password: string): Promise<{ token: string }> {
        const response = await axios.post(connection.get() + "users/auth", { email, password });
        return response.data;
    }

    // Criar novo usuário
    async createUser(user: IUser): Promise<{ msg: string }> {
        const backendUser = this.mapToBackend(user);
        const response = await axios.post(connection.get() + "users", backendUser);
        return response.data;
    }

    // Atualizar carrinho do usuário
    async updateCart(token: string, items: CartItem[]): Promise<{ msg: string }> {
        const response = await axios.put(
            connection.get() + "users/cart",
            { token, items },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    }

    async updateAddress(id: string, newAddress: Partial<IUser['addres']>): Promise<{ msg: string }> {
        const response = await axios.put(
            connection.get() + "users/address",
            { id, newAddress },
            {
                headers: {
                    Authorization: `Bearer ${id}`,
                },
            }
        );
        return response.data;
    }
    
    async upupdateUser(userId: string, updatedData: Partial<IUser>): Promise<{ msg: string }> {
        const response = await axios.put(
            connection.get() + `users/${userId}`, // Usar o userId aqui
            { ...updatedData }, // Passando os dados atualizados
            {
                headers: {
                    Authorization: `Bearer ${userId}`,
                },
            }
        );
        return response.data;
    }
    // Atualizar dados pessoais do usuário
     async updatePersonalData(id: string, newPersonalData: Partial<IUser['personal_data']>): Promise<{ msg: string }> {
        const response = await axios.put(
            connection.get() + "users/personal",
            { id, newPersonalData },
            {
                headers: {
                    Authorization: `Bearer ${id}`,
                },
            }
        );
        return response.data;
    }

    // Atualizar e-mail do usuário
     async updateEmail(id: string, newEmail: string): Promise<{ msg: string }> {
        const response = await axios.put(
            connection.get() + "users/email",
            { id, newEmail },
            {
                headers: {
                    Authorization: `Bearer ${id}`,
                },
            }
        );
        return response.data;
    }

    // Atualizar senha do usuário
     async updatePassword(id: string, newPassword: string): Promise<{ msg: string }> {
        const response = await axios.put(
            connection.get() + "users/password",
            { id, newPassword },
            {
                headers: {
                    Authorization: `Bearer ${id}`,
                },
            }
        );
        return response.data;
    }

    // Obter dados do usuário
    async getUserData(token: string): Promise<IUser> {
        const response = await axios.get(connection.get() + `users/${token}`);
        return this.mapToClient(response.data);
    }

    // Métodos de mapeamento
    private mapToBackend(user: IUser) {
        return {
            header: {
                id: user.header.id,
                token: user.header.token,
                email: user.header.email,
                password: user.header.password,
            },
            personal_data: {
                name: user.personal_data.name,
                cel_number: user.personal_data.cel_number,
                profile_img: user.personal_data.profile_img,
            },
            addres: {
                country: user.addres.country,
                state: user.addres.state,
                city: user.addres.city,
                neighborhood: user.addres.neighborhood,
                street: user.addres.street,
                number: user.addres.number,
                cep: user.addres.cep,
            },
            purchases: user.purchases, 
            cart: {
                items: user.cart.items.map((item) => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: item.price,
                    color: item.color,
                    size: item.size,
                })),
                total: user.cart.total,
            },
        };
    }

    private mapToClient(backendUser: any): IUser {
        return {
            header: {
                id: backendUser.header.id,
                token: backendUser.header.token,
                email: backendUser.header.email,
                password: backendUser.header.password,
            },
            personal_data: {
                name: backendUser.personal_data.name,
                cel_number: backendUser.personal_data.cel_number,
                profile_img: backendUser.personal_data.profile_img,
            },
            addres: {
                country: backendUser.addres.country,
                state: backendUser.addres.state,
                city: backendUser.addres.city,
                neighborhood: backendUser.addres.neighborhood,
                street: backendUser.addres.street,
                number: backendUser.addres.number,
                cep: backendUser.addres.cep,
            },
            purchases: backendUser.purchases, 
            cart: {
                items: backendUser.cart.items.map((item: any) => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: item.price,
                    color: item.color,
                    size: item.size,
                })),
                total: backendUser.cart.total,
            },
        };
    }
}
