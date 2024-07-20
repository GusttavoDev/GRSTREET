import UserRepository from "../../repositories/UserRepository";

export default class UpdateEmailUseCase {
    constructor(
        private userRepository: UserRepository
    ){}

    async execute(token: string, newEmail: string): Promise<void> {
        return await this.userRepository.updateEmail(token, newEmail);
    }
}