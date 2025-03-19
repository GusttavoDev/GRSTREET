"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function User(){
    const [authStatus, setAuthStatus] = useState<string>('Checking authentication...');
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/pages/api/check-auth-user`);
                const data = response.data;
                setAuthStatus(data.status);
                if(data.status !== 'Authenticated') router.push('/User/Login');
                if(authStatus === "Authenticated") router.push('/')
            } catch (error) {
                setAuthStatus('Error checking authentication');
            }
        };

        checkAuth();
    }, []);

    return (
        <>
        <p>{authStatus}</p>
            <p>carregando...</p>
        </>
    )
}