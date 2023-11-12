"use client";

import React, { useState } from "react";

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const stars = Array.from({ length: 5 }).fill(null);

  return (
    <div>
      {stars.map((_, index) => (
        <span
          key={index + 1}
          onClick={() => handleStarClick(index + 1)}
          style={{ cursor: "pointer", color: index < rating ? "gold" : "gray" }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
