import React, { useState } from "react";

const RestaurantMenuApp = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchRestaurants = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          try {
            const API_URL =
              import.meta.env.VITE_API_URL || "http://localhost:5000";
            const response = await fetch(
              `${API_URL}/restaurants?lat=${lat}&lng=${lng}`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch restaurants");
            }
            const data = await response.json();
            if (data.restaurants.length === 0) {
              alert("No restaurants found nearby.");
            } else {
              setRestaurants(data.restaurants);
              setOpenDialog(true);
            }
          } catch (error) {
            console.error("Error fetching restaurants:", error);
            alert("Failed to fetch restaurants. Please try again.");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Failed to get location. Please enable GPS and try again.");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <button onClick={fetchRestaurants} disabled={loading}>
        {loading ? "Loading..." : "Find Nearby Restaurants"}
      </button>

      {openDialog && (
        <div style={styles.dialogOverlay}>
          <div style={styles.dialog}>
            <h2>Nearby Restaurants</h2>
            <ul>
              {restaurants.map((restaurant, index) => (
                <li key={index}>
                  <strong>{restaurant.name}</strong> - {restaurant.address}
                </li>
              ))}
            </ul>
            <button onClick={handleCloseDialog}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  dialogOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default RestaurantMenuApp;
