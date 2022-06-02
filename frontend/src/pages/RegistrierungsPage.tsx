import {AppUser} from "../modelDto/AppUser";
import NewAppUser from "../components/NewAppUser";
import "../css/RegistrationPage.css"

type AddUserPageProps = {
    addNewAppUser: (newAppUser: Omit<AppUser, "id">) => void;
}

export default function RegistrierungsPage({addNewAppUser}: AddUserPageProps){
    return(
        <div className="registration-page">
            <NewAppUser addNewAppUser={addNewAppUser}/>
        </div>
    )
}
