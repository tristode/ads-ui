import useAuthSession from "@/lib/auth";
import { FaCog, FaGoogle } from "react-icons/fa";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Auth() {
  const session = useAuthSession();

  if (!session) {
    return (
      <Button
        onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}
        className="flex items-center gap-1"
      >
        Sign in with <FaGoogle />
      </Button>
    );
  }

  return (
    <>
      <Avatar className="w-6 h-6">
        <AvatarImage
          alt={session.user.user_metadata.name}
          src={session.user.user_metadata.avatar_url}
        />
        <AvatarFallback>{session.user.user_metadata.name[0]}</AvatarFallback>
      </Avatar>
      <FaCog className="w-6 h-6" />
    </>
  );
}