import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { User } from "@/types";

export default function UserCard({ user }: { user: User }) {
  return (
    <div className="flex items-center space-x-2">
      <Avatar>
        <AvatarImage alt={user.name} src={user.avatar} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <span className="font-bold">{user.name}</span>
    </div>
  );
}
