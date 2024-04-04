import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { FaMessage } from "react-icons/fa6";
import { User } from "@/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "./ui/button";
import Checkmark from "./ui/checkmark";
import { useChatCreatorWithUser } from "@/lib/chat";

export default function Author({
  user,
  children,
}: {
  user: User;
  children?: React.ReactNode;
}) {
  const createChat = useChatCreatorWithUser();

  return (
    <HoverCard>
      <HoverCardTrigger className="flex items-center space-x-2 cursor-pointer">
        <Avatar className="w-6 h-6">
          <AvatarImage alt={user.name} src={user.avatar} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <span className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
          {user.name}
        </span>
        <span className="flex flex-row gap-0">
          {user.checkmarks?.map((type) => (
            <Checkmark key={type} type={type} />
          ))}
        </span>
        {children}
      </HoverCardTrigger>
      <HoverCardContent align="start">
        <div className="flex flex-col gap-2">
          <div className="flex items-start space-x-2">
            <Avatar className="w-12 h-12">
              <AvatarImage alt={user.name} src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <div className="flex items-center space-x-2">
                <span className="font-bold">{user.name}</span>
                <div className="flex flex-row gap-0">
                  {user.checkmarks?.map((type) => (
                    <Checkmark key={type} type={type} />
                  ))}
                </div>
              </div>
              <span className="font-black text-xs text-gray-500">
                @{user.handle}
              </span>
            </div>
          </div>
          {user.bio && (
            <span className="text-sm text-gray-500">{user.bio}</span>
          )}
          <div className="flex flex-row w-full gap-2">
            <Button variant="accent" size="sm" className="font-bold w-full">
              Follow
            </Button>
            <Button
              variant="accent"
              size="sm"
              className="font-bold"
              onClick={
                () => createChat(null, user.id) // TODO: redirect to the chat
              }
            >
              <FaMessage />
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
