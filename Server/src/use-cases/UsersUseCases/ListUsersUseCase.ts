import IUser from "../../entities/IUser";
import UserRepository from "../../repositories/UserRepository";

export default class ListUsersUseCase {
    constructor(
        private userRepository: UserRepository
    ){}

    async execute(): Promise<IUser[]> {
        return await this.userRepository.list();
    }
}