"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateAddresUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(token, newAddress) {
        return await this.userRepository.updateAddress(token, newAddress);
    }
}
exports.default = UpdateAddresUseCase;
