"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfigUseCase = exports.updateConfigController = exports.listConfigController = void 0;
const ConfigRepository_1 = __importDefault(require("../repositories/ConfigRepository"));
const ListConfigUseCase_1 = __importDefault(require("../use-cases/ConfigUseCases/ListConfigUseCase"));
const UpdateConfigUseCase_1 = __importDefault(require("../use-cases/ConfigUseCases/UpdateConfigUseCase"));
const CreateConfigUseCase_1 = __importDefault(require("../use-cases/ConfigUseCases/CreateConfigUseCase"));
const configRepository = new ConfigRepository_1.default();
const updateConfigController = new UpdateConfigUseCase_1.default(configRepository);
exports.updateConfigController = updateConfigController;
const createConfigUseCase = new CreateConfigUseCase_1.default(configRepository);
exports.createConfigUseCase = createConfigUseCase;
const listConfigController = new ListConfigUseCase_1.default(configRepository);
exports.listConfigController = listConfigController;
