import AdminRepository from "../../repositories/AdminRepository";

export default class UpdateEmailAdminUseCase {
    constructor(
        private adminsRepository: AdminRepository
    ){}

    async execute(token: string, newEmail: string): Promise<void> {
        return await this.adminsRepository.updateEmail(token, newEmail);
    }
}