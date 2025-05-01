import React, { useState, useEffect, useRef } from 'react';
import Player from './Player';
import Bullet from './Bullet';
import Enemy from './Enemy';

const GAME_WIDTH = 500;
const GAME_HEIGHT = 400;
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;
const ENEMY_WIDTH = 50;

const Game = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 225, y: 175 });
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameRunning, setGameRunning] = useState(false);
  const bulletIntervalRef = useRef(null);

  const resetGame = () => {
    setPlayerPosition({ x: 225, y: 175 });
    setBullets([]);
    setEnemies([]);
    setScore(0);
    setLives(100);
    setGameRunning(true);
  };

  const fireBullet = () => {
    setBullets(prev => [...prev, { x: playerPosition.x + PLAYER_WIDTH / 2 - 2, y: playerPosition.y + PLAYER_HEIGHT }]);
  };

  const handleKeyDown = (e) => {
    if (!gameRunning) return;
    if (e.key === 'ArrowLeft') {
      setPlayerPosition(prev => ({ ...prev, x: Math.max(prev.x - 15, 0) }));
    } else if (e.key === 'ArrowRight') {
      setPlayerPosition(prev => ({ ...prev, x: Math.min(prev.x + 15, GAME_WIDTH - PLAYER_WIDTH) }));
    } else if (e.key === 'ArrowUp') {
      setPlayerPosition(prev => ({ ...prev, y: Math.max(prev.y - 15, 0) }));
    } else if (e.key === 'ArrowDown') {
      setPlayerPosition(prev => ({ ...prev, y: Math.min(prev.y + 15, GAME_HEIGHT - PLAYER_HEIGHT) }));
    } else if (e.key === ' ') {
      if (!bulletIntervalRef.current) {
        fireBullet();
        bulletIntervalRef.current = setInterval(fireBullet, 300);
      }
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === ' ') {
      clearInterval(bulletIntervalRef.current);
      bulletIntervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!gameRunning) return;
    const bulletMove = setInterval(() => {
      setBullets(prev => prev.map(b => ({ ...b, y: b.y + 10 })).filter(b => b.y < GAME_HEIGHT));
    }, 50);
    return () => clearInterval(bulletMove);
  }, [gameRunning]);

  useEffect(() => {
    if (!gameRunning) return;
    const spawnEnemies = setInterval(() => {
      const x = Math.random() * (GAME_WIDTH - ENEMY_WIDTH);
      setEnemies(prev => [...prev, { x, y: GAME_HEIGHT }]);
    }, 1500);

    const moveEnemies = setInterval(() => {
      setEnemies(prev => prev.map(e => ({ ...e, y: e.y - 5 })).filter(e => e.y > 0));
    }, 100);

    return () => {
      clearInterval(spawnEnemies);
      clearInterval(moveEnemies);
    };
  }, [gameRunning]);

  useEffect(() => {
    setEnemies(prev => prev.filter(enemy => {
      const hit = bullets.some(b => b.x > enemy.x && b.x < enemy.x + ENEMY_WIDTH && b.y > enemy.y && b.y < enemy.y + ENEMY_WIDTH);
      if (hit) {
        setScore(prev => prev + 1);
        return false;
      }
      return true;
    }));
  }, [bullets]);

  useEffect(() => {
    const hit = enemies.some(e => e.y <= playerPosition.y + PLAYER_HEIGHT && e.x < playerPosition.x + PLAYER_WIDTH && e.x + ENEMY_WIDTH > playerPosition.x);
    if (hit) {
      setLives(prev => prev - 1);
      setEnemies([]);
      if (lives <= 1) {
        setGameRunning(false);
        clearInterval(bulletIntervalRef.current);
      }
    }
  }, [enemies]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  });

  return (
    <div className="game">
      {!gameRunning && (
        <div className="overlay">
          <h2>{lives === 0 ? 'Край на играта' : 'Игра Стрелец'}</h2>
          <button className="start-button" onClick={resetGame}>Старт</button>
        </div>
      )}
      <Player position={playerPosition} />
      {bullets.map((b, i) => <Bullet key={i} position={b} />)}
      {enemies.map((e, i) => <Enemy key={i} position={e} />)}
      <div className="score">Точки: {score} | Животи: {lives}</div>
    </div>
  );
};


export default Game;
