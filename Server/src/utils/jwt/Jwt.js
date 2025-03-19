"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv/config");
const secretKey = process.env.JWT_SECRET || 'aBcD3fGhIjK4LmNoPqRsTuVwXyZ12!@#$'; // Valor padrão
class Jwt {
    async get(token) {
        // Decodifica o token e faz o tipo de cast para IDecodedToken
        const decoded = (0, jsonwebtoken_1.decode)(token, { complete: true });
        return decoded ? Object.assign(Object.assign({}, decoded), { iat: decoded.iat, exp: decoded.exp, sub: decoded.sub }) : null;
    }
    async verifyToken(token) {
        const decoded = await this.get(token);
        if (!decoded) {
            throw new Error('Invalid or expired token');
        }
        return decoded;
    }
    async create(data) {
        const token = (0, jsonwebtoken_1.sign)(Object.assign({}, data), secretKey, {
            expiresIn: "1y",
            subject: "1",
        });
        return token;
    }
}
exports.default = Jwt;
