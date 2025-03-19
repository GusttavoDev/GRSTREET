"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateConfigUseCase {
    constructor(configRepository) {
        this.configRepository = configRepository;
    }
    // Método que executa a atualização da configuração
    async execute(id, data) {
        return await this.configRepository.update(id, data);
    }
}
exports.default = UpdateConfigUseCase;
