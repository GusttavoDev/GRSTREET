import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const MELHOR_ENVIO_API_URL = "https://sandbox.melhorenvio.com.br/api/v2";
const API_KEY = process.env.MELHOR_ENVIO_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { service_id } = requestBody; // Recebe o ID da transportadora

    if (!service_id) {
      return NextResponse.json({ error: "ID da transportadora é obrigatório" }, { status: 400 });
    }

    // Faz a requisição para obter a lista de transportadoras
    const response = await axios.get(
      `${MELHOR_ENVIO_API_URL}/me/shipment/services`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    // Encontra a transportadora pelo ID
    const transportadora = response.data.find(
      (service: any) => service.id === Number(service_id)
    );

    if (!transportadora) {
      return NextResponse.json({ error: "Transportadora não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ transportadora: transportadora.name });
  } catch (error: any) {
    console.error("Erro ao buscar transportadora:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Erro ao buscar transportadora", details: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
