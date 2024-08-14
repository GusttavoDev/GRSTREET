// src/app/api/set-auth/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const authToken = searchParams.get('token') || 'Not authenticated';

    // Cria ou atualiza o cookie 'AdminIsAuthenticated'
    const response = NextResponse.json({ status: authToken });
    response.cookies.set('AdminIsAuthenticated', authToken, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 * 4, // 4 semanas
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    return response;
}
