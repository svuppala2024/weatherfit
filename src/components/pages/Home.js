import React from "react";
import "../../App.css";
import "../pages/Home.css";
import logo from "../../components/logo.png"
import {Link} from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <p>Welcome to...</p>
      <img src={logo} length="30%" width="30%"></img>
      <h1>WeatherFit</h1>
          
      <p2 className="description">Not sure what to wear? WeatherFit does! Click bellow to get started. </p2>
      <div className="threeButtons">
        <Link to="/SignIn" className="nav-links">
          <button className="homepagebutton" to="/SignIn" type="button" length="50px" width="50px">Sign In</button>
        </Link>

        <Link to="/Closet" className="nav-links">
          <button className="homepagebutton" to="/Closet" type="button" length="50px" width="50px">Closet</button>
        </Link>

        <Link to="/Fit" className="nav-links">
          <button className="homepagebutton" to="/Fit" type="button" length="50px" width="50px">Fits</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;