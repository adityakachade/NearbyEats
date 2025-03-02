import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import MidPart from "./Components/MidPart";
import Recommendation from "./Components/Recommendation";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <div id="mainCtn">
        <Navbar />
        <Hero />
        <MidPart />
        <Recommendation />
        <Footer />
      </div>
    </>
  );
}

export default App;
