import AuthUser from "@/utils/AuthUser";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const authUser = new AuthUser();
    const authStatus = await authUser.isAuth(request.headers.get('cookie') || '');

    return NextResponse.json({ status: authStatus });
}
