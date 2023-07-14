
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { lobbyConfig } from "@/config/lobby";
import { MainNav } from "@/components/layouts/main-nav";
import { SiteFooter } from "@/components/layouts/site-footer";

interface LobbyLayoutProps {
    children: React.ReactNode;
}

export default function LobbyLayout({ 
    children
 }: LobbyLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={lobbyConfig.mainNav} />
          <nav>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
    );
}