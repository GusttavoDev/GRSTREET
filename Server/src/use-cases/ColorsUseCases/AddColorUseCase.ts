import IColor from "../../entities/IColor";
import ColorRepository from "../../repositories/ColorRepository";

export default class AddColorUseCase {
    constructor(
        private colorRepository: ColorRepository
    ){}

    async execute(color: Omit<IColor, "id">): Promise<void> {
        return await this.colorRepository.addColor(color);
    }
}