import React from "react";
import Logo from "../../assets/img/Logo.png";
import "../Menu/Menu.css";

function Menu() {
  return (
    <nav className="Menu">
      <a href="/">
        <img className="Logo" src={Logo} alt="Logo do ReactFlix" />
      </a>
      <a className="ButtonLink" href="/">
        Novo vídeo
      </a>
    </nav>
  );
}
export default Menu;
