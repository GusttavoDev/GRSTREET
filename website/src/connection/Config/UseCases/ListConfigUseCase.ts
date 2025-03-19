import IConfig from "@/entities/IConfig";
import ConfigRepository from "../Repositories/ConfigRepository";

export default class ListConfigUseCase {

    private configRepository: ConfigRepository = new ConfigRepository();

    async execute(): Promise<IConfig[]> {
        return await this.configRepository.list();
    }
}