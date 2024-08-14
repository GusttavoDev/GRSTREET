import { NextResponse } from "next/server";
import AuthAdmin from '@/utils/AuthAdmin';

export async function GET(request: Request) {
    const authAdmin = new AuthAdmin();
    const authStatus = await authAdmin.isAuth(request.headers.get('cookie') || '');

    return NextResponse.json({ status: authStatus });
}
