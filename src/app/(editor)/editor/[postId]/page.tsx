import { notFound, redirect } from "next/navigation";
import supabaseServerComponentClient from "@/lib/supabase";
import { getCurrentUser } from "@/lib/session";
import { Editor } from "@/components/editor";
import { IPost } from "@/types";

// Define the type for the response from the 'posts' table
interface PostData {
  id: string;
  title: string;
  content: string;
  published: boolean;
}

async function getPostForUser(postId: string, userId: string): Promise<PostData | null> {
  const supabase = await supabaseServerComponentClient();
  const response = await supabase
    .from('posts')
    .select()
    .eq('id', postId)
    .eq('user_id', userId)
    .single();

  if (response.error || !response.data) {
    return null;
  }

  // Cast the response.data to the expected type 'PostData'
  const postData: PostData = response.data as PostData;
  return postData;
}

interface EditorPageProps {
  params: { postId: string };
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
    return null;
  }

  const post = await getPostForUser(params.postId, user.id);

  if (!post) {
    notFound();
    return null;
  }

  return (
    <Editor
      post={{
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
      }}
    />
  );
}
