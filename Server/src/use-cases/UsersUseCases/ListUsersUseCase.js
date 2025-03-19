"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListUsersUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute() {
        return await this.userRepository.list();
    }
}
exports.default = ListUsersUseCase;
