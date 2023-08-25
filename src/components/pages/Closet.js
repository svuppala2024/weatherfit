import React from "react";
import "../../App.css";
import "../pages/Closet.css";
import { useState } from 'react';

function Closet() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [selectedLength, setSelectedLength] = useState('');
    const [selectedFormality, setSelectedFormality] = useState('');

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value)
    }
    const handleMaterialChange = (event) => {
        setSelectedMaterial(event.target.value)
    }
    const handleLengthChange = (event) => {
        setSelectedLength(event.target.value)
    }
    const handleFormalityChange = (event) => {
        setSelectedFormality(event.target.value)
    }

    const handleAddItem = () => {
        if (selectedMaterial && selectedLength && selectedType && selectedFormality) {
            setSelectedItems([...selectedItems, [selectedType, selectedMaterial, selectedLength, selectedFormality]]);
            setSelectedType('');
            setSelectedMaterial('');
            setSelectedLength('');
            setSelectedFormality('');
        }
    }

    return (
        <div className="total">
            <div className="alldropdownsbutton">
            <div className="dropdownlabeldiv">
                <label className="labelstyle">Type of Clothing:</label> 
                <div className="dropdowndiv">
                    <select value={selectedType} onChange={handleTypeChange} className="dropdown"> 
                        <option></option> 
                        <option value="Shirt">Shirt</option> 
                        <option value="Sweater / Hoodie">Sweater / Hoodie</option> 
                        <option value="Pants / Shorts">Pants / Shorts</option> 
                        <option value="Dress">Dress</option> 
                        <option value="Skirt">Skirt</option> 
                        <option value="Jacket / Coat">Jacket / Coat</option> 
                    </select>
                </div>
            </div>

            <div className="dropdownlabeldiv">
                <label className="labelstyle">Interior Material of Clothing:</label> 
                <div className="dropdowndiv">
                    <select value={selectedMaterial} onChange={handleMaterialChange} className="dropdown"> 
                        <option></option> 
                        <option value="Wool">Wool</option> 
                        <option value="Cotton">Cotton</option> 
                        <option value="Polyester / Spandex">Polyester / Spandex</option> 
                        <option value="Linen">Linen</option> 
                        <option value="Denim">Denim</option> 
                        <option value="Leather">Leather</option>
                    </select>
                </div>
            </div>

            <div className="dropdownlabeldiv">
                <label className="labelstyle">Length of Clothing:</label> 
                <div className="dropdowndiv">
                    <select value={selectedLength} onChange={handleLengthChange} className="dropdown">
                        <option></option>  
                        <option value="Short">Short</option> 
                        <option value="Long">Long</option> 
                    </select>
                </div>
            </div>
            
            <div className="dropdownlabeldiv">
                <label className="labelstyle">Formality of Clothing:</label> 
                <div className="dropdowndiv">
                    <select value={selectedFormality} onChange={handleFormalityChange} className="dropdown"> 
                        <option></option> 
                        <option value="Business-Casual">Business-Casual</option> 
                        <option value="Athletic">Athletic</option> 
                        <option value="Casual">Casual</option> 
                        <option value="Formal">formal</option> 
                    </select>
                </div>
            </div>

            <div className="buttondiv">
                <button onClick={handleAddItem} className="button">
                    <text className="buttontext">Add Item to Closet</text>
                </button>
            </div> 
            </div>

            <div className="closetlistdiv">
                <h3>Closet:</h3>
                <div className="non-bulleted-list">
                    {selectedItems.map((item, index) => (
                        <div key={index} className="listitemdiv">
                            <span>{item[0]}</span> /
                            <span>{item[1]}</span> /
                            <span>{item[2]}</span> /
                            <span>{item[3]}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Closet;