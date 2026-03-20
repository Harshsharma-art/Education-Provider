import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // For now, we'll use a simple middleware pattern
  // Full session management will be handled client-side with the Supabase JS client
  return NextResponse.next({
    request,
  })
}
