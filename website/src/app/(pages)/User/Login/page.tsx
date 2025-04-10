"use client";  // Adicione esta linha para indicar que o componente é executado no cliente

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import "./style.css";
import AuthenticateUserUseCase from '@/connection/User/UseCases/AuthenticationUserUseCase';
import axios from 'axios';
import NavBar from '@/app/components/navbar/NavBar';
import Domain from '@/connection/domain';
import Head from 'next/head';

const authUserUseCase = new AuthenticateUserUseCase()

const domain = Domain()

export default function LoginUser() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [authStatus, setAuthStatus] = useState<string>('Not authenticated');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const authResponse: { token: string }  = await authUserUseCase.execute(form.email, form.password);
            if(authResponse.token){
                await axios.get(`${domain}pages/api/set-auth-user`, {
                    params: { token: authResponse.token }
                });
                setAuthStatus('Authenticated');
                window.localStorage.setItem('token', authResponse.token)
                router.push('/');
                return;
            }
            setAuthStatus('Credênciais Incorretas!');
        } catch (error) {
            setAuthStatus('Ouve Algum Erro');
        }
    };

    const handleRegister = () => {
        router.push('/User/Register');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
                        <Head>
                <title>GR Street Login</title>
                <meta name="description" content="Encontre as melhores roupas masculinas na GR Street." />
                <meta name="keywords" content="roupas masculinas, blucas, casacos, calças, multi marcas, tenis, acessorios, roupa cristão" />
                <meta property="og:title" content="GR Street - Moda Masculina" />
                <meta property="og:url" content="https://grstreet.com" />
            </Head>
                    <header>
                          <NavBar></NavBar>
            </header>
        <div className="PageLoginUser">
            <form className="FormLoginUser" onSubmit={handleLogin}>
                <h1 className="FormLoginUserH1">Entrar</h1>
                <div className="FormLoginUserContent">
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
                    {authStatus !== "Not authenticated" && (
                        <p className={`auth-status ${authStatus === "Authenticated" ? "success" : "error"}`}>
                            {authStatus}
                        </p>
                    )}
                    <p>Ou <a onClick={handleRegister}>Cadastre-se aqui</a></p>
                    <button type="submit">Entrar</button>
                </div>
            </form>
        </div>
        </>
    );
}
