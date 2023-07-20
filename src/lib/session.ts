import supabaseServerComponentClient from "./supabase"

export async function getCurrentUser() {
  'use server'
  const supabase = await supabaseServerComponentClient();
  const {
    data: { user },
    } = await supabase.auth.getUser()

  return user
}