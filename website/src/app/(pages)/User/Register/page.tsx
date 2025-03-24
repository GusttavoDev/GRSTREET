"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import 'react-phone-number-input/style.css';

import CreateUserUseCase from "@/connection/User/UseCases/CreateUserUseCase";

import "./style.css";
import RegisteredPopup from "../Components/RegisteredPopup/RegisteredPopup";
import NavBar from "@/app/components/navbar/NavBar";
import Head from "next/head";

const createUserUseCase = new CreateUserUseCase();

export default function RegisterUser() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    cpf: "",
    profile_img: "",
    country: "",
    state: "",
    city: "",
    neighborhood: "",
    street: "",
    number: "",
    cep: "",
  });

  const [authStatus, setAuthStatus] = useState<string>("Not authenticated");
  const [phoneStatus, setPhoneStatus] = useState<string>("");
  const [addressStatus, setAddressStatus] = useState<string>("");
  const [registeredPopup, setRegisteredPopup] = useState<boolean>(false);
  const router = useRouter();

  const validatePhone = (phone: string): boolean => {
    const valid = isValidPhoneNumber(phone);
    if (!valid) {
      console.log("Telefone inválido:", phone);
    }
    return valid;
  };

  const validateAddress = async (): Promise<boolean> => {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${form.cep}/json/`
      );
      if (response.data.erro) {
        return false;
      }

      setForm({
        ...form,
        state: response.data.uf,
        city: response.data.localidade,
        street: response.data.logradouro,
        neighborhood: response.data.bairro,
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone(form.cpf)) {
      setPhoneStatus("Telefone inválido! Insira um número no formato +55 21 9 9955-7552.");
      return;
    }

    const isAddressValid = await validateAddress();
    if (!isAddressValid) {
      setAddressStatus("Endereço inválido! Verifique o CEP.");
      return;
    }

    setPhoneStatus("");
    setAddressStatus("");

    const userData = {
      header: {
        id: crypto.randomUUID(),
        token: "",
        email: form.email,
        password: form.password,
      },
      personal_data: {
        name: form.name,
        cel_number: String(form.cpf.replace(/\D/g, "")),
        profile_img: form.profile_img,
      },
      addres: {
        country: form.country,
        state: form.state,
        city: form.city,
        neighborhood: form.neighborhood,
        street: form.street,
        number: Number(form.number),
        cep: parseInt(form.cep.replace(/\D/g, "")),
      },
      cart: {
        items: [],
        total: 0,
      },
      purchases: [],
    };

    try {
      const response = await createUserUseCase.execute(userData);
      if (response) {
        setRegisteredPopup(true);
        setTimeout(() => {
          setRegisteredPopup(false);
          router.push("/User/Login");
        }, 2000);
      } else {
        setAuthStatus("Dados Inválidos ou Já Existentes");
      }
    } catch (error) {
      setAuthStatus("Erro ao realizar o cadastro");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    router.push("/User/Login");
  };

  return (
    <>
                    <Head>
                <title>GR Street Registre-se</title>
                <meta name="description" content="Encontre as melhores roupas masculinas na GR Street." />
                <meta name="keywords" content="roupas masculinas, blucas, casacos, calças, multi marcas, tenis, acessorios, roupa cristão" />
                <meta property="og:title" content="GR Street - Moda Masculina" />
                <meta property="og:url" content="https://grstreet.com" />
            </Head>
      <header>
        <NavBar />
      </header>
      <div className="PageRegisterUser">
        <form className="FormRegisterUser" onSubmit={handleRegister}>
          <h1 className="FormRegisterUserH1">Cadastro</h1>
          <div className="FormRegisterUserContent">
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Senha:</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Senha"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Nome"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="cpf">Telefone:</label>
              <PhoneInput
                name="cpf"
                id="cpf"
                placeholder="Telefone (apenas números, com DDD)"
                value={form.cpf}
                onChange={(value: string | undefined) => setForm({ ...form, cpf: value || "" })}
                defaultCountry="BR"
                international
              />
            </div>
            <div>
              <label htmlFor="cep">CEP:</label>
              <input
                type="text"
                name="cep"
                id="cep"
                placeholder="CEP"
                value={form.cep}
                onChange={handleChange}
                onBlur={validateAddress}
              />
            </div>
            {addressStatus && <div className="error">{addressStatus}</div>}
            <div>
              <label htmlFor="country">País:</label>
              <input
                type="text"
                name="country"
                id="country"
                placeholder="País"
                value={form.country}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="state">Estado:</label>
              <input
                type="text"
                name="state"
                id="state"
                placeholder="Estado"
                value={form.state}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="city">Cidade:</label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="Cidade"
                value={form.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="neighborhood">Bairro:</label>
              <input
                type="text"
                name="neighborhood"
                id="neighborhood"
                placeholder="Bairro"
                value={form.neighborhood}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="street">Rua:</label>
              <input
                type="text"
                name="street"
                id="street"
                placeholder="Rua"
                value={form.street}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="number">Número:</label>
              <input
                type="text"
                name="number"
                id="number"
                placeholder="Número"
                value={form.number}
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="submit">Cadastrar</button>
            </div>
            {authStatus && <div className="error">{authStatus}</div>}
            <div>
              <p>
                Já tem conta? <a onClick={handleLogin}>Login</a>
              </p>
            </div>
          </div>
        </form>
      </div>
      {registeredPopup && <RegisteredPopup />}
    </>
  );
}
