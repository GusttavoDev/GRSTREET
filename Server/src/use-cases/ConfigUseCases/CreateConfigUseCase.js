"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateConfigUseCase {
    constructor(configRepository) {
        this.configRepository = configRepository;
    }
    // Método que executa a atualização da configuração
    async execute() {
        return await this.configRepository.create();
    }
}
exports.default = CreateConfigUseCase;
