import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const MELHOR_ENVIO_API_URL = "https://sandbox.melhorenvio.com.br/api/v2";
const API_KEY = process.env.MELHOR_ENVIO_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { order_id } = await request.json();

    // Verificando se o order_id foi fornecido
    if (!order_id) {
      return NextResponse.json({ error: "ID do pedido é obrigatório" }, { status: 400 });
    }

    // Requisição para a API do Melhor Envio
    const response = await axios.get(
      `${MELHOR_ENVIO_API_URL}/me/orders/${order_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
          "User-Agent": "GustavoEcommerceApp",
        },
      }
    );

    // Retornando o código de rastreio
    return NextResponse.json({ tracking_code: response.data.tracking });
  } catch (error: any) {
    // Tratamento de erro
    console.error("Erro ao obter rastreio:", error?.response?.data || error?.message);
    return NextResponse.json(
      { error: "Erro ao obter rastreio", details: error?.response?.data || error?.message },
      { status: 500 }
    );
  }
}
