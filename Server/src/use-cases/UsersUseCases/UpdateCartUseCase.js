"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateCartUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(token, data) {
        return await this.userRepository.updateCart(token, data);
    }
}
exports.default = UpdateCartUseCase;
