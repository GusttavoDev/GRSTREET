import IUser from "@/entities/IUser";
import UserRepository from "../Repositories/UserRepository";

export default class UpdateUserUseCase {
    private userRepository = new UserRepository;

    async execute(userId: string, data: Partial<IUser>): Promise<{msg: string}> {
        return await this.userRepository.updateUser(userId, data);
    }
}