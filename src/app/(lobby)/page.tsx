import {
    LoginButton,
    LogoutButton,
    ProfileButton,
    RegisterButton,
    } from "@/components/auth/buttons.component";
import { User } from "@/components/auth/user.component";

import { getServerSession } from "next-auth";
import { ModeToggle } from "@/components/mode-toggle";


  export default async function Home() {
    return (
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
 
        <ModeToggle />
      </main>
    );
  }
  