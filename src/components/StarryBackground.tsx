
import React from 'react';

const StarryBackground = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[-10] overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div id="stars-small-layer" />
      <div id="stars-medium-layer" />
      <div id="stars-large-layer" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
    </div>
  );
};

export default StarryBackground;
