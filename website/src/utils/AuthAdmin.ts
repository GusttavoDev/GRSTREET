// src/utils/AuthAdmin.ts
import { parse } from 'cookie';

export default class AuthAdmin {
    async isAuth(cookieHeader: string | undefined): Promise<string> {
        if (!cookieHeader) {
            return 'Not authenticated';
        }

        const cookies = parse(cookieHeader);
        const token = cookies.AdminIsAuthenticated;

        return token ? 'Authenticated' : 'Not authenticated';
    }
}
