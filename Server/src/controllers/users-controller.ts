import UserRepository from "../repositories/UserRepository";

import AuthenticateUserUseCase from "../use-cases/UsersUseCases/AuthenticateUserUseCase";
import CreateUserUseCase from "../use-cases/UsersUseCases/CreateUserUseCase";
import DeleteUserUseCase from "../use-cases/UsersUseCases/DeleteUserUseCase";
import GetUserUseCase from "../use-cases/UsersUseCases/GetUserUseCase";
import ListUsersUseCase from "../use-cases/UsersUseCases/ListUsersUseCase";
import UpdateAddresUseCase from "../use-cases/UsersUseCases/UpdateAddresUseCase";
import UpdateEmailUseCase from "../use-cases/UsersUseCases/UpdateEmailUseCase";
import UpdatePasswordUseCase from "../use-cases/UsersUseCases/UpdatePasswordUseCase";
import UpdatePersonalData from "../use-cases/UsersUseCases/UpdatePersonalDataUseCase";

const userRepository = new UserRepository();

const createUserController = new CreateUserUseCase(userRepository);
const deleteUserController = new DeleteUserUseCase(userRepository);
const authenticateUserController = new AuthenticateUserUseCase(userRepository);
const getUserController = new GetUserUseCase(userRepository);
const listUsersController = new ListUsersUseCase(userRepository);
const updateAddresController = new UpdateAddresUseCase(userRepository);
const updateEmailController = new UpdateEmailUseCase(userRepository);
const updatePasswordController = new UpdatePasswordUseCase(userRepository);
const updatePersonalDataController = new UpdatePersonalData(userRepository);

export { 
    createUserController,
    deleteUserController,
    authenticateUserController,
    getUserController,
    listUsersController,
    updateAddresController,
    updateEmailController,
    updatePasswordController,
    updatePersonalDataController
 };