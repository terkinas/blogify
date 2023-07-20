import { cookies } from 'next/headers'
import { createServerComponentClient, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export default async function supabaseServerComponentClient() {
    'use server'
    return createServerComponentClient({ cookies });
}