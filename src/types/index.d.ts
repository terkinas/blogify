import { User } from "@prisma/client"
import type { Icon } from "lucide-react"

import { Icons } from "@/components/icons"

export type NavItem = {
    title: string
    href: string
    disabled?: boolean
  }
  
export type MainNavItem = NavItem

export type SiteConfig = {
    name: string
    description: string
    url: string
    ogImage: string
    links: {
        twitter: string
        github: string
    }
}

export type LobbyConfig = {
    mainNav: MainNavItem[]
}

export type SubscriptionPlan = {
    name: string
    description: string
    stripePriceId: string
  }
  
export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }