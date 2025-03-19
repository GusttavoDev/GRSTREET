import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    // Remove o cookie 'AdminIsAuthenticated
    const response = NextResponse.json({ message: 'Logged out successfully' });
    response.cookies.set('AdminIsAuthenticated', '', {
        httpOnly: true,
        path: '/',
        maxAge: 0, // Remove imediatamente o cookie
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    return response;
}
