import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import IProductSend from "@/entities/IProductSend";
import IProduct from "@/entities/IProduct";
import { IProductPurchase } from "@/entities/IPurchase";

const MELHOR_ENVIO_API_URL = "https://sandbox.melhorenvio.com.br/api/v2";
const API_KEY = process.env.MELHOR_ENVIO_API_KEY;

export async function POST(request: NextRequest) {
  const requestBody = await request.json();

  const { user, products } = requestBody; // Desestrutura os parâmetros

  if (!user?.postal_code || !products?.length) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const formattedProducts = products.map((p: IProductPurchase) => ({
    id: p.product_id || "",  // Garantir que temos o ID
    height: Number(p.height),  // Dimensões do produto
    width: Number(p.width),
    length: Number(p.length),
    weight: Number(p.weight),  // Peso do produto
    insurance_value: Number(p.declared_value) || Number(p.declared_value),  // Valor declarado do produto
    quantity: Number(p.quantity),  // Informações sobre o produto 
  }));

  const response = await axios.post(
    `${MELHOR_ENVIO_API_URL}/me/shipment/calculate`,
    {
      from: { postal_code: "24890-000" }, // CEP de origem
      to: { postal_code: String(user.postal_code) }, // CEP de destino dinâmico
      products: [formattedProducts],
      services: "1,2,3,4,5,6,7,8,9" // IDs de diferentes transportadoras
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
      }
    }
  );
  const fretes = response.data.sort((a: any, b: any) => a.price - b.price);

  return NextResponse.json({fretes});
}
