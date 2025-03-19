import IUser from "@/entities/IUser";
import UserRepository from "../Repositories/UserRepository";

export default class CreateUserUseCase {
    private userRepository = new UserRepository;

    async execute(data: IUser): Promise<{msg: string}> {
        return await this.userRepository.createUser(data)
    }
}