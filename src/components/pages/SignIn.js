import React from "react";
import "../../App.css";
import "../pages/SignIn.css";

function SignIn() {
  // Creates a dummy sign in page with no functionality using simple tags
  return (
    <div className="backgroundColor">
      <div className="box">
        <div className="block">
          <div className="signintext">
            Sign-In
          </div>
          <div className="form">
            <form>
              <div className="centerpadding">
                <label className="labelllll">Username</label><br></br>
                <input type="text" id="username" name="username" className="fieldwide"></input><br></br>
              </div>
              <div className="centerpadding">
                <label className="labelllll">Password</label><br></br>
                <input type="password" id="password" name="password" className="fieldwide"></input>
              </div>
              <div className="center buttonwide padding">
              <input type="submit" className = "center" value="Login"></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;