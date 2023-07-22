import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Premium",
      href: "/premium",
      disabled: true,
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ],
  sidebarNav: [
    {
      title: "Posts",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}