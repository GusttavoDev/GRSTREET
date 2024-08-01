import IUser from "../../entities/IUser";
import UserRepository from "../../repositories/UserRepository";

export default class CreateUserUseCase {
    constructor(
        private usersRepository: UserRepository
    ){}

    async execute(data: IUser): Promise<void> {
        return await this.usersRepository.create(data); 
    }
}