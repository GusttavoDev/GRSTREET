"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdatePasswordUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(token, newPassword) {
        return await this.userRepository.updatePassword(token, newPassword);
    }
}
exports.default = UpdatePasswordUseCase;
