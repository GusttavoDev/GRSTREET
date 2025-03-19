"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthenticateAdminUseCase {
    constructor(adminsRepository) {
        this.adminsRepository = adminsRepository;
    }
    async execute(email, password) {
        return await this.adminsRepository.authenticate(email, password);
    }
}
exports.default = AuthenticateAdminUseCase;
