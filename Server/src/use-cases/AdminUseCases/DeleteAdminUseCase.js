"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteAdminUseCase {
    constructor(adminsRepository) {
        this.adminsRepository = adminsRepository;
    }
    async execute(token) {
        return await this.adminsRepository.delete(token);
    }
}
exports.default = DeleteAdminUseCase;
