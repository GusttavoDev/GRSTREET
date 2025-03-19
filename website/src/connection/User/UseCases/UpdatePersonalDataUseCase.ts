import IUser from "@/entities/IUser";
import UserRepository from "../Repositories/UserRepository";

export default class UpdatePersonalDataUseCase {
    private userRepository = new UserRepository();

    async execute(userId: string, newPersonalData: Partial<IUser["personal_data"]>): Promise<{ msg: string }> {

        // Passa os dados convertidos para o repositório
        return await this.userRepository.updatePersonalData(userId, newPersonalData);
    }
}
