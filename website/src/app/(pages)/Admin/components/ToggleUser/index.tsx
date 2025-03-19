import axios from "axios";
import { useRouter } from "next/navigation";
import "./ToggleUser.css";

export default function ToggleUser() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:3000/pages/api/unset-auth'); // Endpoint de logout
            router.replace('/Admin/Login'); // Redireciona para a página de login
            window.location.reload(); // Força a atualização da página
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="sairAdmin" onClick={handleLogout}>
            Sair
        </div>
    );
}
