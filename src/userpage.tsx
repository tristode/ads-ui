import { useUser } from "./lib/database";
import {useParams} from "react-router-dom";

import{

} from "@/components/ui/form";

export default function ProfilePage(){
    const { userId } = useParams();
    const user = useUser(userId ?? "");
    return(
        <div>
            
            <span>{user?.handle}</span>
        </div>
    )
}