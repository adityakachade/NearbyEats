import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import RestaurantList from "./RestaurantList";

const VoiceAssistant = () => {
  const [listening, setListening] = useState(false);
  const [topItems, setTopItems] = useState([]);

  // Yelp API Key (replace with your own)
  const YELP_API_KEY = "your_yelp_api_key";

  // Start voice recognition
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.start();
    setListening(true);

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript.toLowerCase().includes("top 5 items")) {
        const location = await getLocation();
        const restaurants = await getNearbyRestaurants(location);
        const items = getTopItems(restaurants);
        setTopItems(items);
        speakResults(items);
      }
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Error:", event.error);
      setListening(false);
    };
  };

  // Get user location
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by your browser.");
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve(`${latitude},${longitude}`);
          },
          (error) => {
            reject("Unable to retrieve your location.");
          }
        );
      }
    });
  };

  // Fetch nearby restaurants using Yelp API
  const getNearbyRestaurants = async (location) => {
    const url = `https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${location.split(",")[0]}&longitude=${location.split(",")[1]}&sort_by=rating&limit=5`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    });
    return response.data.businesses;
  };

  // Extract top 5 items (example logic)
  const getTopItems = (restaurants) => {
    const topItems = [];
    restaurants.forEach((restaurant) => {
      const restaurantName = restaurant.name;
      // Hypothetical menu items (replace with actual API call to fetch menu)
      const menuItems = ["Margherita Pizza", "Spicy Chicken Burger", "Pasta Alfredo"];
      topItems.push(`${menuItems[0]} from ${restaurantName}`);
    });
    return topItems.slice(0, 5); // Return top 5 items
  };

  // Speak the results
  const speakResults = (items) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = `Here are the top 5 items from nearby restaurants: ${items.join(", ")}`;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="voice-assistant">
      <Header onStartListening={startListening} />
      {listening && <p>Listening...</p>}
      {topItems.length > 0 && <RestaurantList items={topItems} />}
    </div>
  );
};

export default VoiceAssistant;