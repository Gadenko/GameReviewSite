import {AppUser} from "../modelDto/AppUser";
import React, {FormEvent, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import styled from "styled-components/macro";

type NewAppUserProps = {
    addNewAppUser: (newAppUser: Omit<AppUser, "id">) => void
}

export default function NewAppUser({addNewAppUser}: NewAppUserProps) {

    const [username, setUsername] = useState(``)
    const [password, setPassword] = useState(``)
    const navigate = useNavigate();

    const onAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!username) {
            toast.error("You need a username!");
            return
        }
        if (!password) {
            toast.error("You need a password!");
            return
        }

        const newAppUser: Omit<AppUser, "id"> = {
            username: username,
            password: password
        }

        addNewAppUser(newAppUser);
        setUsername(``)
        setPassword(``)
        navigate('/login')
    }

    return (
        <Wrapper className="newAppUser">
            <form onSubmit={onAdd}>
                <input type={"text"}
                       placeholder={"Add a username!"}
                       value={username}
                       onChange={event => setUsername(event.target.value)}/>
                <input type={"password"}
                       placeholder={"Add a password!"}
                       value={password}
                       onChange={event => setPassword(event.target.value)}/>
                <AddUserButton type={"submit"}
                               value={"Registrieren"}/>
            </form>
        </Wrapper>
    )
}
const Wrapper = styled.div`
  background-color: #758680;
  border-radius: 8px;
  padding: 5px;
`
const AddUserButton = styled.input`
  border-radius: 4px;
  color: black;
  background-color: slategrey;
  margin-bottom: 1px;
  margin-top: 5px;
`
