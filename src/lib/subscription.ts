import { UserSubscriptionPlan } from "@/types"
import { freePlan, proPlan } from "@/config/subscriptions"
import supabase from "./supabase"

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  const { data: users } = await supabase.from("profiles").select(
    'stripeSubscriptionId, stripeCurrentPeriodEnd, stripeCustomerId, stripePriceId')
    .eq("id", userId)

    console.log('subscriptions:', users)

  if (!users || users.length === 0) {
    throw new Error("User not found")
  }

  const user = users[0]; // Get the first user from the array

  // Check if user is on a pro plan.
  const isPro =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()

  const plan = isPro ? proPlan : freePlan

  return {
    ...plan,
    ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
    isPro,
  }
}
