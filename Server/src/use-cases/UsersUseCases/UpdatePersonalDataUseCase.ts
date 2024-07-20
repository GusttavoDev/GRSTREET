import IUser from "../../entities/IUser";
import UserRepository from "../../repositories/UserRepository";

export default class UpdatePersonalData {
    constructor(
        private userRepository: UserRepository
    ){}

    async execute(token: string, newPersonalData: Partial<IUser['personal_data']>): Promise<void> {
        return await this.userRepository.updatePersonalData(token, newPersonalData);
    }
}   