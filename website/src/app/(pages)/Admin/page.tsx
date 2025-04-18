"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardHeader from './components/DashboardHeader';
import Domain from '@/connection/domain';

const domain = Domain()

export default function Admin(){
    const [authStatus, setAuthStatus] = useState<string>('Checking authentication...');
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${domain}pages/api/check-auth`);
                const data = response.data;
                setAuthStatus(data.status);
                if(data.status !== 'Authenticated') router.push('/Admin/Login');
            } catch (error) {
                setAuthStatus('Error checking authentication');
            }
        };

        checkAuth();
    }, []);

    return (
        <>
            {authStatus === "Authenticated" && <DashboardHeader />}
        </>
    )
}