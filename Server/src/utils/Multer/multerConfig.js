"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Resolve o caminho absoluto para o diretório de uploads
const uploadPath = path_1.default.join(__dirname, '../../../uploads');
exports.default = {
    storage: multer_1.default.diskStorage({
        destination: uploadPath,
        filename(req, file, callback) {
            // Nomeia o arquivo com o timestamp para evitar conflitos
            callback(null, `${Date.now()}-${file.originalname}`);
        }
    }),
    limits: {
        fileSize: 15 * 1024 * 1024 // Limita o tamanho do arquivo para 15MB
    },
    fileFilter: (req, file, call) => {
        // Filtra os arquivos aceitos (apenas imagens)
        const mimeType = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
        if (!mimeType.includes(file.mimetype)) {
            return call(null, false);
        }
        call(null, true);
    }
};
