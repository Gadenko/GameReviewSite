import {FormEvent, useContext, useState} from "react";
import {AuthContext} from "../context/AuthProvider";
import {useNavigate} from "react-router-dom";
import styled from "styled-components/macro";

export default function LoginPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const {login} = useContext(AuthContext)

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        login({
            username: username,
            password: password
        })
    }
    return (
        <Loginpage>
            <form onSubmit={onSubmit}>
                <input type={"text"} value={username} placeholder={"Username"}
                       onChange={(event) => setUsername(event.target.value)}/>
                <input type={"password"} value={password} placeholder={"Password"}
                       onChange={(event) => setPassword(event.target.value)}/>
                <LoginButtons type={"submit"}>Login</LoginButtons>
                <LoginButtons onClick={() => navigate(`/gamereview/registration`)}>Registrieren</LoginButtons>
            </form>

        </Loginpage>)
}

const Loginpage = styled.div`
  margin-top: 70px;
`

const LoginButtons = styled.button`
  border-radius: 4px;
  color: black;
  background-color: slategrey;
  margin-bottom: 1px;
  margin-top: 5px;
`