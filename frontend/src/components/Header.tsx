import {ChangeEvent, useState} from "react";
import "../css/Header.css"

export default function Header(){
    const [search, setSearch] = useState<string>("")
    return(
        <header className="Header">
            <img className="Header-Picture" src={"https://img.freepik.com/vektoren-kostenlos/weinleseabzeichen-der-hand-die-joystickvektorillustration-haelt-rundes-etikett-mit-gamepad_74855-11224.jpg?t=st=1653239105~exp=1653239705~hmac=d536938f4c420a81b8469dbcd43580bb07c01de0a1a5a5e9fc8443c8143489fa&w=826"} alt="logo"/>
            <div className="Search-Bar"><input type={"text"}
                   value={search}
                   placeholder={"Search"}
                   onChange={(event:ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}/>
            </div>
            <nav className="Nav">
                <a className="Link" href="/">Home</a>
                <a className="Link" href="/#/addgamereview">AddGameReview</a>
            </nav>
        </header>
    )
}