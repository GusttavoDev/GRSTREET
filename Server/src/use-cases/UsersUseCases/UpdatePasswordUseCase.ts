import UserRepository from "../../repositories/UserRepository";

export default class UpdatePasswordUseCase {
    constructor(
        private userRepository: UserRepository
    ){}

    async execute(token: string, newPassword: string): Promise<void> {
        return await this.userRepository.updatePassword(token, newPassword);
    }
}