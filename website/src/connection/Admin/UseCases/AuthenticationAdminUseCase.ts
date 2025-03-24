import AdminRepository from "../Repositories/AdminRepository";

export default class AuthenticationAdminUseCase {

    private adminRepository = new AdminRepository();

    async execute(email: string, password: string): Promise<{ token: string } > {
        return await this.adminRepository.authentication(email, password);
    }
}