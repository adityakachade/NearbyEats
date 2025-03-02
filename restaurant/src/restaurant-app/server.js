import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

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
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
    overpassQuery
  )}`;

  try {
    console.log("Fetching restaurants from Overpass API...");
    const response = await axios.get(url);
    console.log("Overpass API response:", response.data);

    if (response.data.elements.length === 0) {
      return res.status(404).json({ error: "No restaurants found nearby" });
    }

    const restaurants = await Promise.all(
      response.data.elements.slice(0, 5).map(async (place) => {
        console.log("Fetching address from Nominatim API...");
        let data = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${place.lat}&lon=${place.lon}&format=json`
        );
        let json = await data.json();
        console.log("Nominatim API response:", json);

        let address = json.address || {};
        let obj = {
          name: place.tags.name || "Unnamed Restaurant",
          address: `${address.house_number || ""} ${address.road || ""}, ${
            address.city || address.town || address.village || ""
          }, ${address.state || ""} (${address.postcode || ""})`.trim(),
        };
        return obj;
      })
    );

    console.log("Restaurants:", restaurants);
    res.json({ restaurants });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
