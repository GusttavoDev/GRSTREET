import IColor from "../../entities/IColor";
import ColorRepository from "../../repositories/ColorRepository";

export default class EditColorUseCase {
    constructor(
        private colorRepositpory: ColorRepository
    ){}

    async execute(color: IColor): Promise<void> {
        return await this.colorRepositpory.editColor(color);
    }
}