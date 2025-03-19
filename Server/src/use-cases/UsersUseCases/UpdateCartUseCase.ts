
import { CartItem } from "../../entities/IUser";
import UserRepository from "../../repositories/UserRepository";

export default class UpdateCartUseCase {
    constructor(
        private userRepository: UserRepository
    ){}

    async execute(token: string, data: CartItem[]): Promise<void> {
        return await this.userRepository.updateCart(token, data);
    }
}