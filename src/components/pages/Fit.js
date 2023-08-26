import React, { useState, useEffect } from "react";
import "../../App.css";
import "../pages/Fit.css";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import firebaseConfig from '../../firebaseConfig.js';

firebase.initializeApp(firebaseConfig);

function Fit() {
  // Creates several useStates that will be used througout the code
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedFormality, setSelectedFormality] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleFormalityChange = (event) => {
    setSelectedFormality(event.target.value);
  };

  useEffect(() => {
        // Fetch items from Firebase and update the state
        const itemsRef = firebase.database().ref('items');
        itemsRef.on('value', (snapshot) => {
            const itemsData = snapshot.val();
            if (itemsData) {
                const itemsArray = Object.values(itemsData);
                setSelectedItems(itemsArray);
            }
        });

        return () => itemsRef.off('value');
  }, []);

  // behemoth function that reduces full clothes list to necessary fit
  function fits(formality, temperature, precipitation) {
    // reducing clothes based on formality of event and ignoring jackets and hoodies
    var formalityItems = []
    for (let i = 0; i < selectedItems.length - 1; i++) {
      if (selectedItems[i].formality === formality && (selectedItems[i].type === "Shirt" || 
      selectedItems[i].type === "Pants / Shorts" || selectedItems[i].type === "Dress" || selectedItems[i].type === "Skirt")) {
        formalityItems.push(selectedItems[i]);
      }
    }

    // reducing clothes for temperature, checking temperature thresholds, clothing length, and need for jackets / hoodies
    var temperatureItems = []
    if (temperature >= 70) {
      for (let i = 0; i < formalityItems.length; i++) {
        if (formalityItems[i].length === "Short") {
          temperatureItems.push(formalityItems[i]);
        }
      }
    } else if (temperature >= 40 && temperature < 55) {
      for (let i = 0; i < formalityItems.length; i++) {
        if (formalityItems[i].length === "Long") {
          temperatureItems.push(formalityItems[i]);
        }
      }
      for (let i = 0; i < selectedItems.length; i++) {
        if (selectedItems[i].type === "Sweater / Hoodie") {
          temperatureItems.push(selectedItems[i]);
        }
      }
    } else {
      for (let i = 0; i < formalityItems.length; i++) {
        if (formalityItems[i].length === "Long") {
          temperatureItems.push(formalityItems[i]);
        }
      }
      for (let i = 0; i < selectedItems.length; i++) {
        if (selectedItems[i].type === "Sweater / Hoodie" || selectedItems[i].type === "Jacket / Coat") {
          temperatureItems.push(selectedItems[i]);
        }
      }
    }

    // checks for precipitation and need for jacket, concatinates jackets to reduced clothes
    var jacketItems = []
    if (precipitation >= 1.5 && temperature >= 40) {
      for (let i = 0; i < selectedItems.length; i++) {
        if (selectedItems[i].type === "Jacket / Coat") {
          jacketItems.push(selectedItems[i]);
        }
      }
      temperatureItems.concat(jacketItems);
    }

    // creates the final list of clothes
    var finalItemList = []
    if (temperature >= 55 && temperature < 70) {
      for (let i = 0; i < temperatureItems.length; i++) {
        if (finalItemList.length == 1 && temperatureItems[i].type === "Shirt") {
          continue;
        }
        if (finalItemList.length == 1 && finalItemList[0].type === "Shirt" && (temperatureItems[i].type === "Pants / Shorts" || 
        temperatureItems[i].type === "Skirt") && temperatureItems[i].length === "Long") {
          finalItemList.push(temperatureItems[i]);
          break;
        }
        if (temperatureItems[i].type === "Dress") {
          finalItemList.push(temperatureItems[i]);
          break;
        } else if (temperatureItems[i].type === "Shirt") {
          finalItemList.push(temperatureItems[i]);
        }
      }
    } else {
      for (let i = 0; i < temperatureItems.length; i++) {
        if (finalItemList.length == 1 && temperatureItems[i].type === "Shirt") {
          continue;
        }
        if (finalItemList.length == 1 && finalItemList[0].type === "Shirt" && 
        (temperatureItems[i].type === "Pants / Shorts" || temperatureItems[i].type === "Skirt")) {
          finalItemList.push(temperatureItems[i]);
          break;
        }
        if (temperatureItems[i].type === "Dress") {
          finalItemList.push(temperatureItems[i]);
          break;
        } else if (temperatureItems[i].type === "Shirt") {
          finalItemList.push(temperatureItems[i]);
        }
      }

      // looping through reduced chothes again for jackets or hoodies
      for (let i = 0; i < temperatureItems.length; i++) {
        if (temperatureItems[i].type === "Jacket / Coat") {
          finalItemList.push(temperatureItems[i]);
          break;
        }
      }
      for (let i = 0; i < temperatureItems.length; i++) {
        if (temperatureItems[i].type === "Sweater / Hoodie") {
          finalItemList.push(temperatureItems[i]);
          break;
        }
      }
    }
    return finalItemList;
  }

  // Create useState to store the JSON data for the weather API
  const [jsonData, setJsonData] = useState(null);

  const handleFitButtonClick = () => {
    const temperature = jsonData.current.temp_f;
    const precipitation = jsonData.forecast.forecastday[0].day.totalprecip_in;
    
    const newFilteredItems = fits(selectedFormality, temperature, precipitation);
    setFilteredItems(newFilteredItems);
  };

  // useEffect fetches the data when the component mounts
  useEffect(() => {
    //  taking zipcode from user and fetching data from a API that outputs current temp and precipitation for the area
    const zip = prompt("What is your location's zipcode?")
    const api_url = `http://api.weatherapi.com/v1/forecast.json?key=6f403da98865458eb8c195706232508&q=${zip}&days=7`;

    fetch(api_url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setJsonData(data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <div>
      {/* This shows the location, temp, and rain/snow levels of weather API */}
      {jsonData && (
        <div className="statsdiv">
          <div className="statsitemdiv">
            <text className="statstext">Location: {jsonData.location.name}</text>
          </div>
          <div className="statsitemdiv">
            <text className="statstext">Current Temperature: {jsonData.current.temp_f}°F</text>
          </div>
          <div className="statsitemdiv">
            <text className="statstext">Current Precipitation Levels: {jsonData.forecast.forecastday[0].day.totalprecip_in} inches</text>
          </div>
        </div>
      )}

      {/* Asks for formality of event to accuratily pinpoint specific clothing requirements */}
      <div className="eventtotaldiv">
        <label className="eventdropdownlabel">What Type of Event are you Going to?</label> 
        <div className="eventdropdowndiv">
            <select className="eventdropdown" value={selectedFormality} onChange={handleFormalityChange}> 
                <option></option> 
                <option value="Business-Casual">Business-Casual</option> 
                <option value="Athletic">Athletic</option> 
                <option value="Casual">Casual</option> 
                <option value="Formal">Formal</option> 
            </select>
          </div>
        </div>

        {/* runs a function that runs the "fits" function that reduces data to single fit */}
        <div className="buttondiv">
          <button onClick={handleFitButtonClick} className="buttonn">
            <text className="buttontextt">
              Create the Fit
            </text>
          </button>
        </div>

        {/* displays all pieces of clothing involved in the outputted fit */}
        <div className="filteredlistdiv">
          {filteredItems.map((item, index) => (
              <div key={index} className="filteredlistitemdiv">
                  <div>
                      <span>
                          <text className="filteredclothingtext">
                              {item.type}
                          </text>
                      </span>
                  </div>
                  <div>
                      <span>
                          <text className="filteredclothingtext">
                              {item.material}
                          </text>
                      </span>
                  </div>
                  <div>
                      <span>
                          <text className="filteredclothingtext">
                              {item.length}
                          </text>
                      </span>
                  </div>
                  <div>
                      <span>
                          <text className="filteredclothingtext">
                              {item.formality}
                          </text>
                      </span>
                  </div>
              </div>
          ))}
        </div>
    </div>
  );
}

export default Fit;
