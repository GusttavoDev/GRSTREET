import IAdmin from "../../entities/IAdmin";
import AdminRepository from "../../repositories/AdminRepository";

export default class GetAdminUseCase {
    constructor(
        private adminsRepository: AdminRepository
    ){}

    async execute(userId: number): Promise<IAdmin | undefined> {
        return await this.adminsRepository.get(userId);
    }
}