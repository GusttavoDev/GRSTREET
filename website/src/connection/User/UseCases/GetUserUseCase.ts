import IUser from "@/entities/IUser";
import UserRepository from "../Repositories/UserRepository";

export default class GetUserUseCase {
    private userRepository = new UserRepository;

    async execute(token: string): Promise<IUser> {
        return this.userRepository.getUserData(token);
    }
}