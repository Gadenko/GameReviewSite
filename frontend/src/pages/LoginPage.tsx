import {FormEvent, useContext, useState} from "react";
import {AuthContext} from "../context/AuthProvider";
import "../css/LoginPage.css"
import {useNavigate} from "react-router-dom";

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
    return (<div className={"loginpage"}>
                <form onSubmit={onSubmit}>
                    <input type={"text"} value={username} placeholder={"Username"}
                   onChange={(event) => setUsername(event.target.value)}/>
                    <input type={"password"} value={password} placeholder={"Password"}
                   onChange={(event) => setPassword(event.target.value)}/>
                    <button type={"submit"}>Login</button>
                    <button onClick={() => navigate(`/gamereview/registration`)}>Registrieren</button>
                </form>

            </div>)
}