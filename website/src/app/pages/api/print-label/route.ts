// pages/api/melhor-envio/print-label.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  // Verifique se o método da requisição é GET
  return res.status(405).json({ error: 'Método não permitido' });
//   if (req.method !== 'GET') {
//   }

//   const { purchaseId } = req.query;

//   if (!purchaseId) {
//     return res.status(400).json({ error: 'ID da compra não fornecido' });
//   }

//   try {
//     // Aqui você deve integrar com a API do Melhor Envio para gerar a etiqueta de envio
//     const shippingLabel = await generateShippingLabel(purchaseId as string);

//     if (!shippingLabel) {
//       return res.status(500).json({ error: 'Erro ao gerar etiqueta de envio' });
//     }

//     // Enviar a etiqueta gerada como PDF ou imagem para ser baixada ou visualizada
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', 'attachment; filename="shipping-label.pdf"');
//     res.status(200).send(shippingLabel); // Envia o arquivo gerado
//   } catch (error) {
//     console.error('Erro ao gerar etiqueta:', error);
//     res.status(500).json({ error: 'Erro ao gerar etiqueta de envio' });
//   }
// }

// // Função fictícia para simular a geração de etiqueta
// async function generateShippingLabel(purchaseId: string) {
//   // Lógica de integração com a API do Melhor Envio (substitua isso com sua lógica real)
//   const labelData = `Etiqueta de envio para o pedido ${purchaseId}\nData: ${new Date().toLocaleString()}`;

//   // Convertendo para PDF ou outro formato desejado
//   return Buffer.from(labelData); // Retornando o conteúdo como um buffer (substitua com o PDF real)
}
