"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import AuthenticationAdminUseCase from '@/connection/Admin/UseCases/AuthenticationAdminUseCase';

import "./style.css";
import Domain from '@/connection/domain';

const authenticationAdminUseCase = new AuthenticationAdminUseCase();

const domain = Domain()

export default function LoginAdmin() {
    const [authStatus, setAuthStatus] = useState<string>('Not authenticated');
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const router = useRouter();

    useEffect(() => {
        //Esta Relmente Authenticado?
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${domain}pages/api/check-auth`);
                const data = response.data;
                setAuthStatus(data.status);
                if(data.status === 'Authenticated') router.push('/Admin');
            } catch (error) {
                setAuthStatus('Error checking authentication');
            }
        };

        checkAuth();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const authResponse: { token: string }  = await authenticationAdminUseCase.execute(form.email, form.password);
            await axios.get(`${domain}pages/api/set-auth`, {
                params: { tokenAdmin: authResponse.token }
            });
            setAuthStatus('Authenticated');
            router.push('/Admin');
            window.location.reload();

        } catch (error) {
            setAuthStatus('Error during authentication');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        authStatus === "Not authenticated" && (
            <div className="PageLoginAdmin">
                <form className="FormLoginAdmin" onSubmit={handleLogin}>
                    <h1 className="FormLoginAdminH1">Login</h1>
                    <div className="FormLoginAdminContent">
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Escreva o Seu Email"
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
                                placeholder="Escreva a Sua Senha"
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        )   
    );
}
