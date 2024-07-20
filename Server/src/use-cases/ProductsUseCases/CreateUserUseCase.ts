import UserRepository from "../../repositories/UserRepository";

export default class CreateUserUseCase {
    constructor(
        private usersRepository: UserRepository
    ){}

    async execute(): Promise<void> {
        return await this.usersRepository.create(); 
    }
}