"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EditColorUseCase {
    constructor(colorRepositpory) {
        this.colorRepositpory = colorRepositpory;
    }
    async execute(color) {
        return await this.colorRepositpory.editColor(color);
    }
}
exports.default = EditColorUseCase;
