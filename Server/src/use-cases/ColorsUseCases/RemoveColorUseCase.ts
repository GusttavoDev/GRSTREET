import ColorRepository from "../../repositories/ColorRepository";

export default class RemoveColorUseCase {
    constructor(
        private colorRepository: ColorRepository
    ){}

    async execute(productId: number, colorName: string): Promise<void> {
        return await this.colorRepository.removeColor(productId, colorName);
    }
}