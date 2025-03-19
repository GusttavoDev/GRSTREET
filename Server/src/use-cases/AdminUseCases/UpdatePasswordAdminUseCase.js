"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdatePasswordAdminUseCase {
    constructor(adminsRepository) {
        this.adminsRepository = adminsRepository;
    }
    async execute(token, newPassword) {
        return await this.adminsRepository.updatePassword(token, newPassword);
    }
}
exports.default = UpdatePasswordAdminUseCase;
