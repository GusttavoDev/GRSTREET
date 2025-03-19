import IUser from "@/entities/IUser";
import UserRepository from "../Repositories/UserRepository";

export default class UpdateAddressUseCase {
    private userRepository = new UserRepository();

    async execute(id: string, newAddress: Partial<IUser["addres"]>): Promise<{ msg: string }> {
        return await this.userRepository.updateAddress(id, newAddress);
    }
}
