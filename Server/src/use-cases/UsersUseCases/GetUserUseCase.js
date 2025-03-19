"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(userId) {
        return await this.userRepository.get(userId);
    }
}
exports.default = GetUserUseCase;
