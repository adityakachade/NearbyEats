import React from "react";
import "../Styles/navbar.css";

const Navbar = () => {
  return (
    <div id="navCtn">
      <div className="navPar1">
        <h1 id="logo">YumYard</h1>
      </div>
      <div className="navPart2">
        {/* <input type="text" placeholder="Search....." /> */}
        <a href="">About</a>
        <a href="">Contact Us</a>
        <a href="">Log In</a>
        <a href="">Sign Up</a>
        <a href="">Profile</a>
      </div>
    </div>
  );
};

export default Navbar;
