import IAdmin from "../../entities/IAdmin";
import AdminRepository from "../../repositories/AdminRepository";

export default class CreateAdminUseCase {
    constructor(
        private adminsRepository: AdminRepository
    ){}

    async execute(data: Omit<IAdmin, "id" | "token">): Promise<void> {
        return await this.adminsRepository.create(data);
    }
}