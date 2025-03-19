"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthenticateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(email, password) {
        return this.userRepository.authenticate(email, password);
    }
}
exports.default = AuthenticateUserUseCase;
