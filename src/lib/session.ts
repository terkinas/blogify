import supabase from "./supabase"

export async function getCurrentUser() {
    
    const { data: user, error } = await supabase.auth.getSession()

  return user
}