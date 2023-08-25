import React from "react";
import "../../App.css";
import "../pages/Fit.css";

function Fit() {
  
  
  
  return (
    <div>
      
     

    </div>
  );
}

export default Fit;

function apiData() {
  var zip = 15;
  const request = new Request(`http://api.weatherapi.com/v1/forecast.json?key=<6f403da98865458eb8c195706232508>&q=${zip}&days=7)`)
  const url = request.url;
  const method = request.method;
  const credentials = request.credentials;
}