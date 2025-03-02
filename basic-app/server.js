const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Sample menu database (Replace with real API later)
const sampleMenus = {
  "indian coffee house": [
    "Paneer Butter Masala",
    "Dal Tadka",
    "Tandoori Roti",
    "Mix Veg",
    "Jeera Rice",
  ],
  "Some Other Restaurant": ["Burger", "Fries", "Coke", "Pizza", "Pasta"],
};

// Get restaurants near user location
app.get("/restaurants", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  const overpassQuery = `
        [out:json];
        node["amenity"="restaurant"](around:5000, ${lat}, ${lng});
        out;
    `;
  const url = `https://overpass-api.de/api/interpreter?data=${overpassQuery}`;

  try {
    const response = await axios.get(url);
    console.log(response.data.elements);

    const restaurants = await Promise.all(
      response.data.elements.slice(0, 5).map(async (place) => {
        let data = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${place.lat}&lon=${place.lon}&format=json`
        );
        let json = await data.json();
        let address = json.address; // Ensure you access the correct property
        let obj = {
          name: place.tags.name || "Unnamed Restaurant",
          address: `${address.house_number || ""}, ${address.road || ""}, ${
            address.city
          }, ${address.city_district}, ${address.state} ( ${
            address.postcode
          } )`,
        };
        console.log(address);
        return obj;
      })
    );

    console.log(restaurants);
    res.json({ restaurants });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// Get menu for a specific restaurant
app.get("/menu", (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Restaurant name is required" });
  }

  const menu = sampleMenus[name.toLowerCase()] || ["Menu not found"];
  res.json({ restaurant: name, menu });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
