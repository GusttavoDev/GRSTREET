import multer, { Options } from 'multer';
import path from 'path';

// Resolve o caminho absoluto para o diretório de uploads
const uploadPath = path.join(__dirname, '../../../uploads');

export default {
    storage: multer.diskStorage({
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
} as Options;
