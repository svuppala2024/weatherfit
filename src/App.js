import './App.css';
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/pages/Home.js";
import Closet from "./components/pages/Closet.js";
import SignIn from "./components/pages/SignIn.js";
import Fit from "./components/pages/Fit.js";

function App() {
  return (
    <div>
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/signin" element={<SignIn/>}/>
          <Route exact path="/closet" element={<Closet/>}/>
          <Route exact path="/fit" element={<Fit/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;