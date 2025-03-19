"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateEmailAdminUseCase {
    constructor(adminsRepository) {
        this.adminsRepository = adminsRepository;
    }
    async execute(token, newEmail) {
        return await this.adminsRepository.updateEmail(token, newEmail);
    }
}
exports.default = UpdateEmailAdminUseCase;
