import { PrismaClient } from "@prisma/client";

import Snowflake from "../utils/snowflake/Snowflake";
import Jwt from "../utils/jwt/Jwt";

import IAdmin from "../entities/IAdmin";

export default class AdminRepository {
    private snowflake: Snowflake;
    private prisma: PrismaClient;
    private jwt: Jwt;

    constructor() {
        this.prisma = new PrismaClient();
        this.snowflake = new Snowflake(1, 1);
        this.jwt = new Jwt();
    }

    async authenticate(email: string, password: string): Promise<string | null> {
        const user = await this.prisma.admin.findUnique({
            where: { email },
        });

        if (user && user.password === password) {
            return user.token;
        }

        return null;
    }

    async get(userId: string): Promise<IAdmin | undefined> {
        const user = await this.prisma.admin.findFirst({
            where: {
                id: userId,
            }
        });

        if (!user) return undefined;

        let creatingAdmin: IAdmin = {
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

    async create(data: Omit<IAdmin, "id" | "token">): Promise<void> {
        const id = this.snowflake.generate();
        const token = await this.jwt.create({
            id,
            ...data,
        });
    
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

    async delete(token: string): Promise<void> {
        const decoded = await this.jwt.verifyToken(token);
        await this.prisma.admin.delete({
            where: {
                id: decoded.id,
            },
        });
    }


    async updateName(token: string, newName: Partial<IAdmin['name']>): Promise<void> {
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

    async updatePassword(token: string, newPassword: string): Promise<void> {
        const decoded = await this.jwt.verifyToken(token);
        const newToken = await this.jwt.create({
            ...decoded,
            password: newPassword,
        })
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

    async updateEmail(token: string, newEmail: string): Promise<void> {
        const decoded = await this.jwt.verifyToken(token);
        const newToken = await this.jwt.create({
            ...decoded,
            email: newEmail,
        })
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