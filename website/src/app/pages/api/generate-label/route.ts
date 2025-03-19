import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const MELHOR_ENVIO_API_URL = "https://sandbox.melhorenvio.com.br/api/v2";
const API_KEY = process.env.MELHOR_ENVIO_API_KEY;
const SHOP_ID = process.env.MELHOR_ENVIO_SHOP_ID; // ID da loja no Melhor Envio

export async function POST(request: NextRequest) {
  try {
    const { user, products, service_id } = await request.json();

    if (!user?.postal_code || !products?.length || !service_id) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const formattedProducts = products.map((p: any) => ({
      id: p.product_id,
      height: Number(p.height),
      width: Number(p.width),
      length: Number(p.length),
      weight: Number(p.weight),
      insurance_value: Number(p.declared_value) || 0,
      quantity: Number(p.quantity),
    }));

    const shipmentData = {
      service: service_id, // ID da transportadora
      agency: null,
      from: { postal_code: "24890-000" },
      to: { postal_code: String(user.postal_code) },
      products: formattedProducts,
      options: {
        insurance_value: formattedProducts.reduce((sum: number, p: { insurance_value: number }) => sum + p.insurance_value, 0),
        receipt: false,
        own_hand: false,
        reverse: false,
        non_commercial: true,
      },
      volumes: [
        {
          height: 10,
          width: 15,
          length: 20,
          weight: 1,
        },
      ],
      tags: ["ecommerce"],
    };

    const response = await axios.post(
      `${MELHOR_ENVIO_API_URL}/me/orders`,
      shipmentData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
          "User-Agent": "GustavoEcommerceApp",
        },
      }
    );

    return NextResponse.json({ etiqueta: response.data });
  } catch (error: any) {
    console.error("Erro ao gerar etiqueta:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Erro ao gerar etiqueta", details: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
