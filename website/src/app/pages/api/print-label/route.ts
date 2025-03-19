// src/app/api/print-label/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Função para verificar se o método é GET
export async function GET(req: NextRequest) {
  return NextResponse.json({ error: 'ID da compra não fornecido' }, { status: 400 });
  // Obter o parâmetro de compra (purchaseId) da query string
//   const { purchaseId } = req.nextUrl.searchParams;

//   // Verificar se o purchaseId foi fornecido
//   if (!purchaseId) {
//     return NextResponse.json({ error: 'ID da compra não fornecido' }, { status: 400 });
//   }

//   try {
//     // Aqui você deve integrar com a API do Melhor Envio para gerar a etiqueta de envio
//     const shippingLabel = await generateShippingLabel(purchaseId);

//     if (!shippingLabel) {
//       return NextResponse.json({ error: 'Erro ao gerar etiqueta de envio' }, { status: 500 });
//     }

//     // Enviar a etiqueta gerada como PDF ou imagem para ser baixada ou visualizada
//     const response = NextResponse.json(shippingLabel);
//     response.headers.set('Content-Type', 'application/pdf');
//     response.headers.set('Content-Disposition', 'attachment; filename="shipping-label.pdf"');

//     return response;
//   } catch (error) {
//     console.error('Erro ao gerar etiqueta:', error);
//     return NextResponse.json({ error: 'Erro ao gerar etiqueta de envio' }, { status: 500 });
//   }
// }

// // Função fictícia para simular a geração de etiqueta
// async function generateShippingLabel(purchaseId: string) {
//   // Lógica de integração com a API do Melhor Envio (substitua isso com sua lógica real)
//   const labelData = `Etiqueta de envio para o pedido ${purchaseId}\nData: ${new Date().toLocaleString()}`;

//   // Convertendo para PDF ou outro formato desejado
//   return Buffer.from(labelData); // Retornando o conteúdo como um buffer (substitua com o PDF real)
}
