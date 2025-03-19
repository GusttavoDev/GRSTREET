import AuthUser from "@/utils/AuthUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const authUser = new AuthUser();
    const authStatus = await authUser.isAuth(request.headers.get('cookie') || '');

    return NextResponse.json({ status: authStatus });
}
