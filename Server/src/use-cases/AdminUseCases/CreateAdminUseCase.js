"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateAdminUseCase {
    constructor(adminsRepository) {
        this.adminsRepository = adminsRepository;
    }
    async execute(data) {
        return await this.adminsRepository.create(data);
    }
}
exports.default = CreateAdminUseCase;
