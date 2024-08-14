import AdminRepository from "../../repositories/AdminRepository";

export default class DeleteAdminUseCase {
    constructor(
        private adminsRepository: AdminRepository
    ){}

    async execute(token: string): Promise<void> {
        return await this.adminsRepository.delete(token);
    }
}