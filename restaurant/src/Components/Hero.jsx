import React, { useState, useEffect } from "react";
import "../Styles/hero.css";
import { Search, MapPin } from "lucide-react";
import SpeakButton from "./SpeakButton";
import RestaurantMenuApp from "./RestaurantMenuApp ";

const Hero = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [locationName, setLocationName] = useState("Detect Current Location");
  const [error, setError] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setError("");

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const address = data.display_name || "Unknown Location";
            setLocationName(address);
          } catch (error) {
            console.error("Error fetching location name:", error);
            setLocationName("Location detected, but name unavailable");
          }
        },
        (error) => {
          setError("Unable to retrieve your location.");
          console.error("Error getting location:", error);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div id="heroCtn">
      <p style={{ color: "white", fontSize: "60px" }}>
        Discover the best food & drinks near you
      </p>
      <div className="inputSerachCtn">
        <MapPin style={{ color: "black", fontWeight: "bolder" }} />
        <input
          type="text"
          // placeholder={locationName}
          value={locationName}
          readOnly
        />
        <span style={{ fontSize: "larger" }}>|</span>
        <Search style={{ color: "black" }} />
        <input type="text" placeholder="Search for restaurant" />
      </div>
      <div>
        <SpeakButton />
        <RestaurantMenuApp />
      </div>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default Hero;
