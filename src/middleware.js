import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default async function middleware(req) {
    // Mengambil token cookies dari callback nextauth-options.js
    const session = await getToken({ req })
    const url = req.nextUrl.pathname
    // console.log(session?.role)
    if (session !== null) { // Jika user sudah melakukan autentikasi
        // Jika user sudah login dan mengakses signin/signup.page, maka akan dialihkan ke dashboard
        if (url.startsWith('/auth/signin') || url.startsWith('/auth/signup')) {
            // return NextResponse.redirect(new URL('/dashboard', req.url));
            if (session.role === "admin") {
                return NextResponse.redirect(new URL('/dashboard', req.url));
            } else return NextResponse.redirect(new URL('/', req.url))
        }
    } else { // Jika user belum melakukan autentikasi
        // Jika user belum login dan mengakses dashboard, maka akan dialihkan ke signin.page
        if (url.startsWith('/dashboard')) {
            return NextResponse.redirect(new URL('/auth/signin', req.url));
        }
    }
}

// Matcher berfungsi menunjukkan router secara spesifik agar dilindungi
export const config = { matcher: ['/auth/:path*', '/', '/dashboard/:path*'] }