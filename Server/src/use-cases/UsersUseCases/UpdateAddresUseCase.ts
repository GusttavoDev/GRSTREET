import IUser from "../../entities/IUser";
import UserRepository from "../../repositories/UserRepository";

export default class UpdateAddresUseCase {
    constructor(
        private userRepository: UserRepository
    ){}

    async execute(token: string, newAddress: Partial<IUser['addres']>): Promise<void> {
        return await this.userRepository.updateAddress(token, newAddress);
    }
}