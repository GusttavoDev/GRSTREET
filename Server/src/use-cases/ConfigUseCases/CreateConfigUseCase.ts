import ConfigRepository from "../../repositories/ConfigRepository";

export default class CreateConfigUseCase {
    constructor(
        private configRepository: ConfigRepository
    ){}

    // Método que executa a atualização da configuração
    async execute(): Promise<void> {
        return await this.configRepository.create();
    }
}
