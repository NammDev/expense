import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const url = req.nextUrl

  const supabase = createMiddlewareClient({ req, res })
  const { data } = await supabase.auth.getSession()
  const { session } = data

  if (url.pathname === '/signin' || url.pathname === '/signup' || url.pathname === '/') {
    if (session) {
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
    return res
  } else {
    // url.pathname = `/signin`
    // return NextResponse.rewrite(url)
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
