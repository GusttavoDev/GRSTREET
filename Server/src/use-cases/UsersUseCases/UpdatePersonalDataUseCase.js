"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdatePersonalData {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(token, newPersonalData) {
        return await this.userRepository.updatePersonalData(token, newPersonalData);
    }
}
exports.default = UpdatePersonalData;
