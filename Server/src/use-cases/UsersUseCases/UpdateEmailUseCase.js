"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateEmailUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(token, newEmail) {
        return await this.userRepository.updateEmail(token, newEmail);
    }
}
exports.default = UpdateEmailUseCase;
