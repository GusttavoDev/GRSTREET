import IAdmin from "../../entities/IAdmin";
import AdminRepository from "../../repositories/AdminRepository";

export default class UpdatePasswordAdminUseCase {
    constructor(
        private adminsRepository: AdminRepository
    ){}

    async execute(token: string, newPassword: string): Promise<void> {
        return await this.adminsRepository.updatePassword(token, newPassword);
    }
}