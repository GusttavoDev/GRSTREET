import IConfig from "@/entities/IConfig";
import ConfigRepository from "../Repositories/ConfigRepository";

export default class UpdateConnfigUseCase {
    private configRepository = new ConfigRepository()

    async execute(data: IConfig): Promise<Object> {
        return await this.configRepository.update(data)
    }
}