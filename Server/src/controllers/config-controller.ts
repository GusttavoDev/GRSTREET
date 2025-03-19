import ConfigRepository from "../repositories/ConfigRepository";

import ListConfigUseCase from "../use-cases/ConfigUseCases/ListConfigUseCase";
import UpdateConfigUseCase from "../use-cases/ConfigUseCases/UpdateConfigUseCase";
import CreateConfigUseCase from "../use-cases/ConfigUseCases/CreateConfigUseCase";

const configRepository = new ConfigRepository();

const updateConfigController = new UpdateConfigUseCase(configRepository);
const createConfigUseCase = new CreateConfigUseCase(configRepository);
const listConfigController = new ListConfigUseCase(configRepository);

export { 
    listConfigController,
    updateConfigController,
    createConfigUseCase,
 };