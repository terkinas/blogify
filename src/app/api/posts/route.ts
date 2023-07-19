import * as z from "zod"

import supabase from "@/lib/supabase"
import { RequiresProPlanError } from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"

const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
})

export async function GET() {
  try {
    const {
      data: { user },
  } = await supabase.auth.getUser()

    if (!user) {
        return new Response("Unauthorized", { status: 403 })
      }

    const posts = await supabase.from('posts')
    .select('id, title, published, createdAt').eq('user_id', user.id)

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
    try {
      const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return new Response("Unauthorized", { status: 403 })
    }

    // const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // // If user is on a free plan.
    // // Check if user has reached limit of 3 posts.
    // if (!subscriptionPlan?.isPro) {

    const { count } = await supabase.from('posts').select('*', { count: 'exact' })

     // If user has reached limit of 3 posts, throw error.
      // if (count && count >= 3) {
      //   throw new RequiresProPlanError()
      // }
    // }

    const json = await req.json()
    const body = postCreateSchema.parse(json)

    const post = await supabase.from('posts').insert([
      { title: body.title, content: body.content, user_id: user.id },
    ])


    return new Response(JSON.stringify(post))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 })
    }

    return new Response(null, { status: 500 })
  }
}