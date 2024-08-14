import AdminRepository from "../../repositories/AdminRepository";

export default class AuthenticateAdminUseCase {
    constructor(
        private adminsRepository: AdminRepository
    ){}

    async execute(email: string, password: string): Promise<string | null > {
        return await this.adminsRepository.authenticate(email, password);
    }
}