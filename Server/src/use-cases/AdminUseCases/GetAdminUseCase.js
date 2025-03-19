"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetAdminUseCase {
    constructor(adminsRepository) {
        this.adminsRepository = adminsRepository;
    }
    async execute(userId) {
        return await this.adminsRepository.get(userId);
    }
}
exports.default = GetAdminUseCase;
