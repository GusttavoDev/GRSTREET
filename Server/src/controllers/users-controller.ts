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

const createUserUseCase = new CreateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository);
const listUsersUseCase = new ListUsersUseCase(userRepository);
const updateAddresUseCase = new UpdateAddresUseCase(userRepository);
const updateEmailUseCase = new UpdateEmailUseCase(userRepository);
const updatePasswordUseCase = new UpdatePasswordUseCase(userRepository);
const updatePersonalDataUseCase = new UpdatePersonalData(userRepository);

export { 
    createUserUseCase,
    deleteUserUseCase,
    authenticateUserUseCase,
    getUserUseCase,
    listUsersUseCase,
    updateAddresUseCase,
    updateEmailUseCase,
    updatePasswordUseCase,
    updatePersonalDataUseCase
 };