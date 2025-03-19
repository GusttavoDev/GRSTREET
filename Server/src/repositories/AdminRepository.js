"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Snowflake_1 = __importDefault(require("../utils/snowflake/Snowflake"));
const Jwt_1 = __importDefault(require("../utils/jwt/Jwt"));
class AdminRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.snowflake = new Snowflake_1.default(1, 1);
        this.jwt = new Jwt_1.default();
    }
    async authenticate(email, password) {
        const user = await this.prisma.admin.findUnique({
            where: { email },
        });
        if (user && user.password === password) {
            return user.token;
        }
        return null;
    }
    async get(userId) {
        const user = await this.prisma.admin.findFirst({
            where: {
                id: userId,
            }
        });
        if (!user)
            return undefined;
        let creatingAdmin = {
            id: user.id,
            token: user.token,
            email: user.email,
            name: user.name,
            password: user.password,
            storeLogo: "",
            storeName: "",
        };
        return creatingAdmin;
    }
    async create(data) {
        const id = this.snowflake.generate();
        const token = await this.jwt.create(Object.assign({ id }, data));
        const userData = {
            id,
            token,
            email: data.email,
            password: data.password,
            name: data.name,
            storeLogo: data.storeLogo,
            storeName: data.storeName
        };
        await this.prisma.admin.create({
            data: userData,
        });
    }
    async delete(token) {
        const decoded = await this.jwt.verifyToken(token);
        await this.prisma.admin.delete({
            where: {
                id: decoded.id,
            },
        });
    }
    async updateName(token, newName) {
        const decoded = await this.jwt.verifyToken(token);
        await this.prisma.admin.update({
            where: {
                id: decoded.id,
            },
            data: {
                name: newName,
            },
        });
    }
    async updatePassword(token, newPassword) {
        const decoded = await this.jwt.verifyToken(token);
        const newToken = await this.jwt.create(Object.assign(Object.assign({}, decoded), { password: newPassword }));
        await this.prisma.admin.update({
            where: {
                id: decoded.id,
            },
            data: {
                token: newToken,
                password: newPassword,
            },
        });
    }
    async updateEmail(token, newEmail) {
        const decoded = await this.jwt.verifyToken(token);
        const newToken = await this.jwt.create(Object.assign(Object.assign({}, decoded), { email: newEmail }));
        await this.prisma.admin.update({
            where: {
                id: decoded.id,
            },
            data: {
                token: newToken,
                email: newEmail,
            },
        });
    }
}
exports.default = AdminRepository;
