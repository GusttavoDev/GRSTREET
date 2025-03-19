
import { CartItem } from "@/entities/IUser";
import UserRepository from "../Repositories/UserRepository";

export default class UpdatCartUseCase {
    private userRepository = new UserRepository;

    async execute(token: string, data: CartItem[]): Promise<{msg: string}> {
        return await this.userRepository.updateCart(token, data);
    }
}