import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // Защищенные пути
    const protectedPaths = ['/profile'];
    const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

    // Если пользователь не аутентифицирован и запрашивает защищенный путь
    if (isProtected && !token) {
        return NextResponse.redirect(new URL('api/auth/sign', req.url));
    }
    // Если аутентифицированный пользователь пытается открыть /login
    if (token && pathname === '/api/auth/sign') {
        return NextResponse.redirect(new URL('/profile', req.url));
    }

    return NextResponse.next();
}
