import { decode, sign, JwtPayload } from "jsonwebtoken";
import "dotenv/config";

export interface IDataToken {
    id: string;
    name: string;
    email: string;
    password: string;
}

// Tipo que inclui os campos adicionais
export interface IDecodedToken extends IDataToken {
    iat: number;
    exp: number;
    sub: string;
}

const secretKey = process.env.JWT_SECRET || 'aBcD3fGhIjK4LmNoPqRsTuVwXyZ12!@#$'; // Valor padrão

export default class Jwt {
    
    async get(token: string): Promise<IDecodedToken | null> {
        // Decodifica o token e faz o tipo de cast para IDecodedToken
        const decoded = decode(token, { complete: true }) as JwtPayload & IDecodedToken | null;
        return decoded ? { ...decoded, iat: decoded.iat!, exp: decoded.exp!, sub: decoded.sub! } : null;
    }

    async verifyToken(token: string): Promise<IDecodedToken> {
        const decoded = await this.get(token);
        if (!decoded) {
            throw new Error('Invalid or expired token');
        }
        return decoded;
    }

    async create(data: IDataToken): Promise<string> {
        const token = sign(
            {
                ...data
            },
            secretKey,
            {
                expiresIn: "1y",
                subject: "1",
            }
        );

        return token;
    }
}
