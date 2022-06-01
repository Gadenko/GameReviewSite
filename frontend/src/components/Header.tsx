import "../css/Header.css"
import {FcDatabase, FcHome, FcPlus, FcReading} from "react-icons/fc";


export default function Header() {

    return (
        <div className="navbar">
            <div className="dropdown">
                <button
                    className="dropbtn"><FcDatabase/>
                </button>
                <div className="dropdown-content">
                    <a href="#" onClick={logout}>LOGOUT</a>
                </div>

            </div>
            <a href="/#/login"><FcReading/></a>
            <a href="/#/addgamereview"><FcPlus/></a>
            <a href="/"><FcHome/></a>
            <img className="header-logo"
                 src="https://www.creativefabrica.com/wp-content/uploads/2020/11/01/Hunter-Squad-Esport-Gaming-Logo-Graphics-6405081-1.jpg"
                 alt="Hier sollte ein Bild sein."/>
        </div>
    )

    function logout() {
        localStorage.clear();
        window.location.href = '/';
    }
}