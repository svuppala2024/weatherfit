import React, { useState, useEffect } from "react";
import "../../App.css";
import "../pages/Fit.css";

function Fit() {
  // Initialize state to store the JSON data
  const [jsonData, setJsonData] = useState(null);

  // Fetch the data when the component mounts
  useEffect(() => {
    const zip = prompt("What is your zipcode?");
    const api_url = `http://api.weatherapi.com/v1/forecast.json?key=6f403da98865458eb8c195706232508&q=${zip}&days=7`;

    fetch(api_url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setJsonData(data); // Update state with fetched data
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div>
      {jsonData && (
        <div>
          <p>Location: {jsonData.location.name}</p>
          <p>Current Temperature: {jsonData.current.temp_c}°C</p>
          {/* Add more data as needed */}
        </div>
      )}
    </div>
  );
}

export default Fit;
