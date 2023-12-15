import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    // so the default loaded component is warframe/med-calculation
    if (request !== undefined && request.url !== undefined && request.url.endsWith('/')) {
        return NextResponse.redirect(new URL('/warframe/med-calculation', request.url));
    }
}