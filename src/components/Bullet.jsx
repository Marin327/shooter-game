// src/components/Bullet.js
import React from 'react';

const Bullet = ({ position }) => {
  return (
    <div
      className="bullet"
      style={{
        left: `${position.x}px`,
        bottom: `${position.y}px`,
      }}
    >
      <div className="bullet-box"></div>
    </div>
  );
};

export default Bullet;
