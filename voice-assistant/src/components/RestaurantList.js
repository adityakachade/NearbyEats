import React from "react";

const RestaurantList = ({ items }) => {
  return (
    <div className="restaurant-list">
      <h2>Top 5 Items</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;