import React from "react";

const Header = ({ onStartListening }) => {
  return (
    <header className="header">
      <h1>Voice Assistant: Top 5 Restaurant Items</h1>
      <button onClick={onStartListening} className="start-btn">
        Start Listening
      </button>
    </header>
  );
};

export default Header;