import IColor from "../../entities/IColor";
import ColorRepository from "../../repositories/ColorRepository";

export default class ListColorsUseCase {
    constructor(
        private colorRepository: ColorRepository
    ){}

    async execute(productId: string): Promise<IColor[]> {
        return await this.colorRepository.listColor(productId);
    }
}