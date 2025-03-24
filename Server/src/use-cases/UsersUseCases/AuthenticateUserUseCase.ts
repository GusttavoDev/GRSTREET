import UserRepository from "../../repositories/UserRepository";

export default class AuthenticateUserUseCase {
    constructor(
        private userRepository: UserRepository
    ){}

    async execute(email: string, password: string): Promise<string | null> {
        return await this.userRepository.authenticate(email, password);
    }
}