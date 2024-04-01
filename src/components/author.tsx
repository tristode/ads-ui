import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { User } from "@/types";

export default function Author({
  user,
  children,
}: {
  user: User;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Avatar className="w-6 h-6">
        <AvatarImage alt={user.name} src={user.avatar} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <span className="font-bold">{user.name}</span>
      {children}
    </div>
  );
}
