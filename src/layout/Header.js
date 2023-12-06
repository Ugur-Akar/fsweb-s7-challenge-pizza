import React from "react";
import "../styles/Header.css";


function Header(){
    const titlePath = "../Assets/logo.svg";

    return (
        <header className="header flex-container">
            <img src={titlePath} alt="Teknolojik Yemekler"/>
        </header>
    )

}

export default Header;