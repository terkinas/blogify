// import { User } from "@prisma/client"
import type { Icon } from "lucide-react"

export type User = {
    id?: string
    email?: string
    name?: string
    stripeSubscriptionId?: string
    
}

import { Icons } from "@/components/icons"
import { title } from "process"

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

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

interface IPost {
  id: string
  title: string,
  content?: string,
  published?: boolean,
  createdAt?: string,
}