// src/components/Player.js
import React from 'react';

const Player = ({ position, onMove }) => {
  return (
    <div
      className="player"
      style={{
        left: `${position.x}px`,
        bottom: `${position.y}px`,
      }}
    >
      {/* Играчът е представен като квадрат */}
      <div className="player-box"></div>
    </div>
  );
};

export default Player;
