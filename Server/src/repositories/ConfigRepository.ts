import { PrismaClient } from "@prisma/client";
import Snowflake from "../utils/snowflake/Snowflake";
import IConfig from "../entities/IConfig";

export default class ConfigRepository {
    private prisma: PrismaClient;
    private snowflake: Snowflake;

    constructor() {
        this.prisma = new PrismaClient();
        this.snowflake = new Snowflake(1, 1);
    }

    // Método list retorna as configurações sem o campo id
    async list(): Promise<Omit<IConfig, "id">[]> {
        const configs = await this.prisma.config.findMany();
        return configs.map(config => ({
            banner1: config.banner1,
            banner2: config.banner2,
            banner3: config.banner3,
            bannerLink1: config.bannerLink1,
            bannerLink2: config.bannerLink2,
            bannerLink3: config.bannerLink3,
            categorie1: config.categorie1,
            categorie2: config.categorie2,
            categorie3: config.categorie3,
        }));
    }

    async create(): Promise<void> {
        await this.prisma.config.create({
            data: {
                id: '0',
                banner1: '',
                banner2: '',
                banner3: '',
                bannerLink1: '',
                bannerLink2: '',
                bannerLink3: '',
                categorie1: '',
                categorie2: '',
                categorie3: '',
            }
        })
    }

    // Método para atualizar a configuração existente
    async update(id: string, data: Partial<IConfig>): Promise<void> {
        await this.prisma.config.update({
            where: { id },
            data,
        });
    }
}
