"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListConfigUseCase {
    constructor(configRepository) {
        this.configRepository = configRepository;
    }
    // Método que executa a listagem das configurações
    async execute() {
        return await this.configRepository.list();
    }
}
exports.default = ListConfigUseCase;
