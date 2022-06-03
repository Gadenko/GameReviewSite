import {FcDatabase, FcHome, FcPlus, FcReading} from "react-icons/fc";
import styled from "styled-components/macro";

export default function Header() {

    return (
        <Wrapper>
            <Dropdown>
                <DropBtn className="dropbtn"><FcDatabase/></DropBtn>
                <DropdownContent className="dropdown-content">
                    <DropdownContentA onClick={logout}>LOGOUT</DropdownContentA>
                </DropdownContent>

            </Dropdown>
            <Home href="/#/login"><FcReading/></Home>
            <Home href="/#/addgamereview"><FcPlus/></Home>
            <Home href="/"><FcHome/></Home>
            <HeaderPicture className="header-logo"
                           src="https://www.creativefabrica.com/wp-content/uploads/2020/11/01/Hunter-Squad-Esport-Gaming-Logo-Graphics-6405081-1.jpg"
                           alt="Hier sollte ein Bild sein."/>
        </Wrapper>
    )

    function logout() {
        localStorage.clear();
        window.location.href = '/';
    }
}

const Home = styled.a`
  float: right;
  overflow: hidden;
  margin-top: 15px;
  margin-right: 10px;
  padding-left: 10px;
`
const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  z-index: 10;
`
const Dropdown = styled.div`
  float: right;
  position: relative;
  display: inline-block;

  :hover
  .dropdown-content {
    display: block;
  }

  :hover
  .dropbtn {
    background-color: grey;
  }
`
const DropBtn = styled.div`
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
`
const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: red;
  min-width: 160px;
  margin-left: -120px;
  margin-top: 5px;
  box-shadow: 0 20px 16px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 1;
`
const DropdownContentA = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  :hover {
    background-color: red;
    border-radius: 8px;
  }
`
const HeaderPicture = styled.img`
  height: auto;
  width: 70px;
`
