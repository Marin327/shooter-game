import React from 'react';
import Game from './components/Game';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="header">
        <h1 className="title">Игра Стрелец 🚀</h1>
        <p className="subtitle">Присъедини се към екшън приключението!</p>
      </div>
      <Game />
    </div>
  );
}

export default App;
