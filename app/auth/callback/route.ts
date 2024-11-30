import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore =  cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    await supabase.auth.exchangeCodeForSession(code)
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.error('Auth error:', userError)
      return NextResponse.redirect(`${requestUrl.origin}/error`)
    }

    const { error: upsertError } = await supabase
      .from('users')
      .upsert({
        id: user.id,
        email: user.email,
        updated_at: new Date().toISOString(),
      })

    if (upsertError) {
      console.error('Database error:', upsertError)
      return NextResponse.redirect(`${requestUrl.origin}/error`)
    }

    return NextResponse.redirect(`${requestUrl.origin}/pricing`)
  }

  return NextResponse.redirect(`${requestUrl.origin}`)
}