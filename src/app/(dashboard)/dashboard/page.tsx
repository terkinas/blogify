import { redirect } from "next/navigation"

import supabaseServerComponentClient from "@/lib/supabase"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"
import ClientConsole from "@/components/client-console"

export const metadata = {
  title: "Dashboard",
}

interface PostsHeaderProps {
    id: string,
    title: string,
    published: boolean,
    createdAt: string,
}

export default async function DashboardPage() {
  const supabase = await supabaseServerComponentClient();
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const {data:posts} = await supabase.from('posts').select().eq('user_id', user.id)

  

  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeader>
      <ClientConsole data={posts} />
      <div>
        {posts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            <PostCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}