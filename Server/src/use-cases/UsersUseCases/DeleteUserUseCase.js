"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(token) {
        return await this.userRepository.delete(token);
    }
}
exports.default = DeleteUserUseCase;
