// src/utils/AuthAdmin.ts
import { parse } from 'cookie';

export default class AuthUser {
    async isAuth(cookieHeader: string | undefined): Promise<string> {
        if (!cookieHeader) {
            return 'Not authenticated';
        }

        const cookies = parse(cookieHeader);
        const token = cookies.UserIsAuthenticated;
        
        return token ? 'Authenticated' : 'Not authenticated';
    }
}
