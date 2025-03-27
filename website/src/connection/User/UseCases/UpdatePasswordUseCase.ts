import IUser from "@/entities/IUser";
import UserRepository from "../Repositories/UserRepository";

export default class UpdatePasswordUseCase {
    private userRepository = new UserRepository;

    async execute(userId: string, password: string): Promise<{msg: string}> {
        return await this.userRepository.updatePassword(userId, password);
    }
}