import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { User } from "@/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "./ui/button";

export default function Author({
  user,
  children,
}: {
  user: User;
  children?: React.ReactNode;
}) {
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
        {children}
      </HoverCardTrigger>
      <HoverCardContent align="start">
        <div className="flex items-start space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage alt={user.name} src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold">{user.name}</span>
            {user.bio && (
              <span className="text-sm text-gray-500">{user.bio}</span>
            )}
            <Button variant="accent" size="sm" className="font-bold">
              Follow
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
