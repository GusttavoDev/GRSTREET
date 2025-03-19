// src/app/api/set-auth/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const authToken = searchParams.get('tokenUser') || 'Not authenticated';

    // Se o token não for válido, retorna erro
    if (authToken === 'Not authenticated') {
        return NextResponse.json({ error: 'Token inválido ou ausente' }, { status: 400 });
    }

    // Cria ou atualiza o cookie 'UserIsAuthenticated'
    const response = NextResponse.json({ status: 'Authenticated successfully' });
    response.cookies.set('UserIsAuthenticated', authToken, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 * 4, // 4 semanas
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    return response;
}
