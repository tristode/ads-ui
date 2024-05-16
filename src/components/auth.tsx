import { FaCog, FaGoogle } from "react-icons/fa";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { logOut, signIn, useAuthSession } from "@/lib/auth";

export default function Auth() {
  const session = useAuthSession(true);

  if (!session) {
    return (
      <Button onClick={() => signIn()} className="flex items-center gap-1">
        Sign in with <FaGoogle />
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2" onClick={logOut}>
      <Avatar className="w-6 h-6">
        <AvatarImage
          alt={session.user.user_metadata.name}
          src={session.user.user_metadata.avatar_url}
        />
        <AvatarFallback>{session.user.user_metadata.name[0]}</AvatarFallback>
      </Avatar>
      <FaCog className="w-6 h-6" />
    </div>
  );
}
