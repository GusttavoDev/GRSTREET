import UserRepository from "../repositories/UserRepository";
import CreateUserUseCase from "../use-cases/ProductsUseCases/CreateUserUseCase";

const userRepository = new UserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);

export { createUserUseCase };