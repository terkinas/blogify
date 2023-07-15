
import { ModeToggle } from "@/components/mode-toggle";
import ClientConsole from "@/components/client-console";
import supabase from "@/lib/supabase";

  export default async function Home() {

    const { data: user } = await supabase.auth.getUser();

    return (
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
     <ClientConsole data={user} />
     
        <ModeToggle />
      </main>
    );
  }
  