import AdminRepository from "../repositories/AdminRepository";

import AuthenticateAdminUseCase from "../use-cases/AdminUseCases/AuthenticateAdminUseCase";
import CreateAdminUseCase from "../use-cases/AdminUseCases/CreateAdminUseCase";
import DeleteAdminUseCase from "../use-cases/AdminUseCases/DeleteAdminUseCase";
import GetAdminUseCase from "../use-cases/AdminUseCases/GetAdminUseCase";
import UpdatePasswordAdminUseCase from "../use-cases/AdminUseCases/UpdatePasswordAdminUseCase";
import UpdateEmailAdminUseCase from "../use-cases/AdminUseCases/UpdateEmailAdminUseCase";

const adminRepository = new AdminRepository();

const createAdminController = new CreateAdminUseCase(adminRepository);
const deleteAdminController = new DeleteAdminUseCase(adminRepository);
const authenticateAdminController = new AuthenticateAdminUseCase(adminRepository);
const getAdminController = new GetAdminUseCase(adminRepository);
const updateAdminEmailController = new UpdateEmailAdminUseCase(adminRepository);
const updateAdminPasswordController = new UpdatePasswordAdminUseCase(adminRepository);

export { 
    createAdminController,
    deleteAdminController,
    authenticateAdminController,
    getAdminController,
    updateAdminEmailController,
    updateAdminPasswordController,
 };