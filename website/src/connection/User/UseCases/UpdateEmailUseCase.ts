import UserRepository from "../Repositories/UserRepository";
import IUser from "@/entities/IUser";

export default class UpdateEmailUseCase {
    private userRepository = new UserRepository();

    async execute(userId: string, newEmail: string): Promise<{ msg: string }> {
        // Obtenha os dados do usuário (ou use alguma lógica para obter o header atual do usuário)
        // const user: IUser = await this.userRepository.getUserData(userId);
        
        // // Construa o objeto `header` com os dados atuais, mas com o `email` atualizado
        // const updatedHeader = {
        //     ...user.header,        // Mantenha os valores atuais de id, token e password
        //     email: newEmail,       // Atualize apenas o email
        // };

        // Agora, passe o `updatedHeader` para o repositório
        return await this.userRepository.updateEmail(userId, newEmail);
    }
}
