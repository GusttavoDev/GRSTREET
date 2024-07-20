import IUser from "../../entities/IUser";
import UserRepository from "../../repositories/UserRepository";

export default class GetUserUseCase {
    constructor(
        private userRepository: UserRepository
    ){}

    async execute(userId: number): Promise<IUser | undefined> {
        return await this.userRepository.get(userId);
    }
}