import ColorRepository from "../repositories/ColorRepository"
import AddColorUseCase from "../use-cases/ColorsUseCases/AddColorUseCase";
import EditColorUseCase from "../use-cases/ColorsUseCases/EditColorUseCase";
import ListColorsUseCase from "../use-cases/ColorsUseCases/ListColorsUseCase";
import RemoveColorUseCase from "../use-cases/ColorsUseCases/RemoveColorUseCase";

const colorsRepository = new ColorRepository();

const addColorController = new AddColorUseCase(colorsRepository);
const editColorController = new EditColorUseCase(colorsRepository);
const listColorController = new ListColorsUseCase(colorsRepository);
const removeColorController = new RemoveColorUseCase(colorsRepository);

export {
    addColorController,
    editColorController,
    listColorController,
    removeColorController
}