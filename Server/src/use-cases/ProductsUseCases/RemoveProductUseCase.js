"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RemoveProductUseCase {
    constructor(productReposiroty) {
        this.productReposiroty = productReposiroty;
    }
    async execute(id) {
        return await this.productReposiroty.removeProduct(id);
    }
}
exports.default = RemoveProductUseCase;
