import ConfigRepository from "../../repositories/ConfigRepository";
import IConfig from "../../entities/IConfig";

export default class ListConfigUseCase {
    constructor(
        private configRepository: ConfigRepository
    ){}

    // Método que executa a listagem das configurações
    async execute(): Promise<Omit<IConfig, "id">[]> {
        return await this.configRepository.list();
    }
}
