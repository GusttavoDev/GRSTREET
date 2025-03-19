import ConfigRepository from "../../repositories/ConfigRepository";
import IConfig from "../../entities/IConfig";

export default class UpdateConfigUseCase {
    constructor(
        private configRepository: ConfigRepository
    ){}

    // Método que executa a atualização da configuração
    async execute(id: string, data: Partial<IConfig>): Promise<void> {
        return await this.configRepository.update(id, data);
    }
}
