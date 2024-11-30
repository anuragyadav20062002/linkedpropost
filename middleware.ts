import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is not logged in and trying to access protected routes
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  // If logged in user doesn't have a subscription tier and trying to access dashboard
  if (session && req.nextUrl.pathname.startsWith('/dashboard')) {
    const { data: user } = await supabase
      .from('users')
      .select('subscription_tier')
      .single()

    if (!user?.subscription_tier) {
      return NextResponse.redirect(new URL('/pricing', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/pricing']
}
