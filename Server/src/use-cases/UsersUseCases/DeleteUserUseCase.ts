import UserRepository from "../../repositories/UserRepository";

export default class DeleteUserUseCase {
    constructor(
        private userRepository: UserRepository
    ){}

    async execute(token: string): Promise<void> {
        return await this.userRepository.delete(token);
    }
}