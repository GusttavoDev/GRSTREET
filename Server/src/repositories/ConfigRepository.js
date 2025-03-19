"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Snowflake_1 = __importDefault(require("../utils/snowflake/Snowflake"));
class ConfigRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.snowflake = new Snowflake_1.default(1, 1);
    }
    // Método list retorna as configurações sem o campo id
    async list() {
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
            categorieImage1: config.categorieImage1,
            categorieImage2: config.categorieImage2,
            categorieImage3: config.categorieImage3,
            categorieImage4: config.categorieImage4,
            categorieImage5: config.categorieImage5,
            categorieImageLink1: config.categorieImageLink1,
            categorieImageLink2: config.categorieImageLink2,
            categorieImageLink3: config.categorieImageLink3,
            categorieImageLink4: config.categorieImageLink4,
            categorieImageLink5: config.categorieImageLink5,
        }));
    }
    async create() {
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
                categorieImage1: '',
                categorieImage2: '',
                categorieImage3: '',
                categorieImage4: '',
                categorieImage5: '',
                categorieImageLink1: '',
                categorieImageLink2: '',
                categorieImageLink3: '',
                categorieImageLink4: '',
                categorieImageLink5: ''
            }
        });
    }
    // Método para atualizar a configuração existente
    async update(id, data) {
        await this.prisma.config.update({
            where: { id },
            data,
        });
    }
}
exports.default = ConfigRepository;
