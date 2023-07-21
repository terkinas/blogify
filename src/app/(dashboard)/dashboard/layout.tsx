import { notFound, redirect } from "next/navigation"

import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { MainNav } from "@/components/layouts/main-nav"
import { DashboardNav } from "@/components/layouts/dashboard-nav"
import { SiteFooter } from "@/components/layouts/site-footer"
import { UserAccountNav } from "@/components/layouts/user-account-nav"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'


interface DashboardLayoutProps {
  children?: React.ReactNode,
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {

  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  if (!user) {
    redirect('/login')
}

const signOut = async () => {
    'use server'
    const supabase = createServerActionClient({ cookies })
    await supabase.auth.signOut()
    redirect('/login')
  }


  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: 'User',
              image: null,
              email: 'support@blogify.com',
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
