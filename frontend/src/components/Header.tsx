import {ChangeEvent, useState} from "react";
import "../css/Header.css"

export default function Header(){
    const [search, setSearch] = useState<string>("")
    return(
        <header className="Header">
            <img className="Header-Picture" src={"https://img.freepik.com/vektoren-kostenlos/niedliche-pinguin-spielkarikatur-illustration_138676-2741.jpg?t=st=1653234529~exp=1653235129~hmac=a3e1f0d249c33437e7af45961bb45d52ca59e9deb32b3b23b3efd5d3f91aad17&w=826"} alt="logo"/>
            <div className="Search-Bar"><input type={"text"}
                   value={search}
                   placeholder={"Search"}
                   onChange={(event:ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}/>
            </div>
            <nav className="Nav">
                <a href="/">Home</a>
            </nav>
        </header>
    )
}