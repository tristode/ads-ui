import { useUser } from "./lib/database";
import {useParams} from "react-router-dom";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Checkmark from "./components/ui/checkmark";


export default function ProfilePage(){
    const { userId } = useParams();
    const user = useUser(userId ?? "");
    return(
        <div className="flex flex-col items-center justify-center pt-16">
        <div className="flex flex-col items-start justify-center w-full md:w-1/2">
            <Avatar className="w-12 h-12">
              <AvatarImage alt={user?.name} src={user?.avatar} />
              <AvatarFallback>{user?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <div className="flex items-center space-x-2">
                <span className="font-bold">{user?.name}</span>
                <div className="flex flex-row gap-0">
                  {user?.checkmarks?.map((type) => (
                    <Checkmark key={type} type={type} />
                  ))}
                </div>
              </div>
              <span className="font-black text-xs text-gray-500">
                @{user?.handle}  
              </span>
              <span className="font-black text-xs text-gray-500">
                {user?.bio}
              </span>
        </div>
        </div>
    </div>
    )
}