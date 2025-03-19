// src/app/api/unset-auth/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    // Remove o cookie 'UserIsAuthenticated'
    const response = NextResponse.json({ message: 'Logged out successfully' });
    response.cookies.set('UserIsAuthenticated', '', {
        httpOnly: true,
        path: '/',
        maxAge: 0, // Remove imediatamente o cookie
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    return response;
}
