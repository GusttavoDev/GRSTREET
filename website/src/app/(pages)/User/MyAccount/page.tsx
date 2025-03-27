"use client";
import { useEffect, useState } from "react";
import GetUserUseCase from "@/connection/User/UseCases/GetUserUseCase";
import IUser from "@/entities/IUser";
import Loading from "@/app/components/loading/Loading";
import NavBar from "@/app/components/navbar/NavBar";
import "./style.css";
import UpdateEmailUseCase from "@/connection/User/UseCases/UpdateEmailUseCase";
import UpdateAddressUseCase from "@/connection/User/UseCases/UpdateAddressUseCase";
import UpdatePersonalDataUseCase from "@/connection/User/UseCases/UpdatePersonalDataUseCase";
import UpdatePasswordUseCase from "@/connection/User/UseCases/UpdatePasswordUseCase";

const getUserUseCase = new GetUserUseCase();
const updatePersonalDataUseCase = new UpdatePersonalDataUseCase()
const updateEmailUseCase = new UpdateEmailUseCase()
const updateAddressUseCase = new UpdateAddressUseCase()
const updatePasswordUseCase = new UpdatePasswordUseCase();

export default function MyAccount() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<IUser | null>(null);
  const [password, setPassword] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Você não está logado em uma conta!");
        return;
      }
      try {
        const response = await getUserUseCase.execute(token);
        if (!response) {
          alert("Houve um problema ao buscar suas informações.");
          return;
        }
        setUser(response);
        setEditedUser(response);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedUser) return;
    const { name, value } = e.target;

    if (name.startsWith("addres.")) {
      setEditedUser((prev) =>
        prev
          ? {
              ...prev,
              addres: {
                ...prev.addres,
                [name.replace("addres.", "")]: value,
              },
            }
          : null
      );
    } else {
      setEditedUser((prev) =>
        prev
          ? {
              ...prev,
              personal_data: {
                ...prev.personal_data,
                [name]: value,
              },
            }
          : null
      );
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("Você não está logado em uma conta!");
      return;
    }
  
    if (!user) return alert("Você não está logado!");
    if (!editedUser) return alert("Não é possível salvar o Usuário, já que nada foi editado");
  
    try {
      // Atualizar os dados pessoais (nome, celular)
      if (editedUser.personal_data !== user.personal_data) {
        await updatePersonalDataUseCase.execute(user.header.id, editedUser.personal_data);
      }
  
      // Atualizar o endereço
      if (editedUser.addres !== user.addres) {
        await updateAddressUseCase.execute(user.header.id, editedUser.addres);
      }
  
      // Atualizar o email, se necessário
      if (editedUser.header.email !== user.header.email) {
        await updateEmailUseCase.execute(user.header.id, editedUser.header.email);
      }
      if(editedUser.header.password != password) {
        await updatePasswordUseCase.execute(user.header.id, password)
      }
  
      alert("Informações atualizadas com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar informações:", error);
    } finally {
      setLoading(false);
    }
  };
  
  

  if (loading) return <Loading />;

  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className="account-container">
        <h1>Minha Conta</h1>
        {user ? (
          <div className="account-details">
            <div className="profile-picture">
              <img
                src={"https://graph.facebook.com/v2.10/100000000000000/picture?type=large"}
                alt="Foto de perfil"
              />
              {/* <span className="change-photo">Alterar foto</span> */}
            </div>

            <div className="info">
              <label>Nome:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedUser?.personal_data.name || ""}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.personal_data.name}</p>
              )}

              <label>Email:</label>
              <p>{user.header.email}</p>

              <label>Celular:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="cel_number"
                  value={editedUser?.personal_data.cel_number || ""}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.personal_data.cel_number}</p>
              )}
            </div>

            <div className="password-section">
              <label>Nova Senha:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
        ) : (
          <p>Erro ao carregar suas informações.</p>
        )}

        {/* Seção de Endereço */}
        {user && (
          <div className="address">
            <h2>Endereço</h2>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="addres.street"
                  placeholder="Rua"
                  value={editedUser?.addres.street || ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="addres.number"
                  placeholder="Número"
                  value={editedUser?.addres.number || ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="addres.neighborhood"
                  placeholder="Bairro"
                  value={editedUser?.addres.neighborhood || ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="addres.city"
                  placeholder="Cidade"
                  value={editedUser?.addres.city || ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="addres.state"
                  placeholder="Estado"
                  value={editedUser?.addres.state || ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="addres.cep"
                  placeholder="CEP"
                  value={editedUser?.addres.cep || ""}
                  onChange={handleChange}
                />
              </>
            ) : (
              <>
                <p>{user.addres.street}, Nº {user.addres.number}</p>
                <p>{user.addres.neighborhood} - {user.addres.city}/{user.addres.state}</p>
                <p>CEP: {user.addres.cep}</p>
              </>
            )}
          </div>
        )}

        <div className="buttons">
          <button className="edit-button" onClick={handleEditToggle}>
            {isEditing ? "Cancelar" : "Editar"}
          </button>
          {isEditing && <button className="save-button" onClick={handleSave}>Salvar</button>}
        </div>
      </div>
    </>
  );
}
