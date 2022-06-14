import {useState} from "react";
import {AppUser} from "../modelDto/AppUser";
import {postNewAppUser} from "../service/game-review-api";
import {toast} from "react-toastify";

export default function useAppUser(){
    const [appUser, setAppUser] = useState<AppUser[]>([]);

    const addNewAppUser = (newAppUser: Omit<AppUser, "id">) => {
        postNewAppUser(newAppUser)
            .then(addedAppUser => setAppUser([...appUser,addedAppUser]))
            .then(() => {toast.success("AppUser: " + newAppUser.username + " created");})
            .catch(() => toast.error("The username already exist."))
    }
    return{appUser, addNewAppUser}
}
