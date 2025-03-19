import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const MELHOR_ENVIO_API_URL = "https://sandbox.melhorenvio.com.br/api/v2";
const API_KEY = process.env.MELHOR_ENVIO_API_KEY;
const SHOP_ID = process.env.MELHOR_ENVIO_SHOP_ID; // ID da loja no Melhor Envio

export async function POST(request: NextRequest) {
  try {
    // Obtendo os dados do corpo da requisição
    const { user, products, service_id } = await request.json();

    // Validação simples dos dados recebidos
    if (!user?.postal_code || !products?.length || !service_id) {
      return NextResponse.json(
        { error: "Dados inválidos. Verifique o código postal do usuário, os produtos e o ID do serviço." },
        { status: 400 }
      );
    }

    // Formatação dos produtos para enviar ao Melhor Envio
    const formattedProducts = products.map((p: any) => ({
      id: p.product_id, // Garantir que o ID do produto esteja presente
      height: Number(p.height),
      width: Number(p.width),
      length: Number(p.length),
      weight: Number(p.weight),
      insurance_value: Number(p.declared_value) || 0, // Se não houver valor declarado, usamos 0
      quantity: Number(p.quantity),
    }));

    // Dados para o envio da solicitação de etiqueta
    const shipmentData = {
      service: service_id, // ID da transportadora
      agency: null, // Agências podem ser configuradas se necessário
      from: { postal_code: "24890-000" }, // CEP de origem fixo
      to: { postal_code: String(user.postal_code) }, // CEP de destino dinâmico
      products: formattedProducts, // Lista de produtos
      options: {
        insurance_value: formattedProducts.reduce((sum: number, p: { insurance_value: number }) => sum + p.insurance_value, 0), // Valor total do seguro
        receipt: false, // Recebimento da mercadoria
        own_hand: false, // Entrega com recebimento próprio
        reverse: false, // Devolução reversa
        non_commercial: true, // Não comercial
      },
      volumes: [
        {
          height: 10, // Exemplo de dimensões para o volume
          width: 15,
          length: 20,
          weight: 1, // Peso do volume
        },
      ],
      tags: ["ecommerce"], // Tag para identificar como e-commerce
    };

    // Enviar a solicitação para a API do Melhor Envio
    const response = await axios.post(
      `${MELHOR_ENVIO_API_URL}/me/orders`,
      shipmentData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
          "User-Agent": "GustavoEcommerceApp", // Definir o user-agent
        },
      }
    );

    // Retorno da resposta com a etiqueta gerada
    return NextResponse.json({ etiqueta: response.data });
  } catch (error: any) {
    // Captura de erro e resposta com detalhes
    console.error("Erro ao gerar etiqueta:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Erro ao gerar etiqueta", details: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
