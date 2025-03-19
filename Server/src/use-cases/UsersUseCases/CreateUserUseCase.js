"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateUserUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(data) {
        return await this.usersRepository.create(data);
    }
}
exports.default = CreateUserUseCase;
