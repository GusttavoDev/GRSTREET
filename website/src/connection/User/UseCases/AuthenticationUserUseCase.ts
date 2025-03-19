import UserRepository from "../Repositories/UserRepository";

export default class AuthenticateUserUseCase {
    private userRepository = new UserRepository;

    async execute(email: string, password: string): Promise<{token: string}> {
        return await this.userRepository.authenticate(email, password);
    }
}