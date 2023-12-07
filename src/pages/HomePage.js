import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/HomePage.css";

function HomePage(){
    const titlePath = "../Assets/logo.svg";

    return(
        <div className="home-page">
            <img src={titlePath} alt="Teknolojik Yemekler" className="title-logo" />


            <p className="home-page-p">KOD ACIKTIRIR</p>
            <p className="home-page-p">PİZZA DOYURUR</p>

            <br />
            <br />

            <NavLink to = "/pizza" id="order-pizza" data-cy="home-button">
                ACIKTIM
            </NavLink>
        </div>
    )
}

export default HomePage;