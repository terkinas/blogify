
import { ModeToggle } from "@/components/mode-toggle";
import ClientConsole from "@/components/client-console";
import supabaseServerComponentClient from "@/lib/supabase";
import { getCurrentUser } from "@/lib/session";

  export default async function Home() {
    const supabase = await supabaseServerComponentClient();
    let response = await supabase
    .from('profiles')
    .select()
    
    const nSession = getCurrentUser();
    // const { data: session } = await supabase.auth.getSession();

    // const { data: user } = await supabase.auth.getUser();]
    const { count } = await supabase.from('posts').select('*', { count: 'exact' })

    return (
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
     <ClientConsole data={count} />
     
        <ModeToggle />
      </main>
    );
  }
  
  