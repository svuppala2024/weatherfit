import React from "react";
import "../components/Navbar.css";
import {Link} from "react-router-dom";

function Navbar(){
    return(
        <>
        <nav className="navbar">
            <div className="navbar-container">
            <Link to="/" className="navbarlogo">
                    WeatherFit 
                </Link>
                <div className="navlinks-container">  
                    <Link to="/SignIn" className="nav-links">
                        Sign Up / Log In
                    </Link>
                    <Link to="/Closet" className="nav-links">
                        Closet
                    </Link>
                    <Link to="/Fit" className="nav-links">
                        Fit Creater
                    </Link>
                </div>
            </div>
        </nav>
        </>
    );
}

export default Navbar; 