import {AppUser} from "../modelDto/AppUser";
import NewAppUser from "../components/NewAppUser";
import styled from "styled-components/macro";

type AddUserPageProps = {
    addNewAppUser: (newAppUser: Omit<AppUser, "id">) => void;
}

export default function RegistrierungsPage({addNewAppUser}: AddUserPageProps) {
    return (
        <RegistrationPage className="registration-page">
            <NewAppUser addNewAppUser={addNewAppUser}/>
        </RegistrationPage>
    )
}

const RegistrationPage = styled.div`
  margin-top: 70px;
`
