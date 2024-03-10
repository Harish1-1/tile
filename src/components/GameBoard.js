import React, { useState, useEffect } from 'react';
import Tile from './Tile';

function GameBoard({ playerName, finishGame }) {
  const tileContents = ['🌞', '🌛', '🌟', '⭐', '🌈', '☁️', '🔥', '💧', '🍃', '🌵', '🌴', '🍁', '🍂', '❄️', '🌊', '🌙'];
  const [tiles, setTiles] = useState(shuffleArray([...tileContents, ...tileContents]));
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedTiles, setMatchedTiles] = useState([]);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    setTiles(shuffleArray([...tileContents, ...tileContents]));
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    if (flippedTiles.length === 2) {
      const match = tiles[flippedTiles[0]] === tiles[flippedTiles[1]];
      if (match) {
        setMatchedTiles(prev => [...prev, ...flippedTiles]);
        setScore(prev => prev + 1);
      } else {
        setScore(prev => prev - 1);
      }
      setTimeout(() => setFlippedTiles([]), 800);
    }
  }, [flippedTiles, tiles]);

  useEffect(() => {
    if (matchedTiles.length === tileContents.length * 2) {
      finishGame(score, elapsedTime);
    }
  }, [matchedTiles, finishGame, score, elapsedTime]);

  function handleTileClick(index) {
    if (flippedTiles.includes(index) || matchedTiles.includes(index)) {
      return; 
    }
    if (flippedTiles.length < 2) {
      setFlippedTiles([...flippedTiles, index]);
    }
  }

  return (
    <div className="game-board">
      <h1>Mahajong Game</h1>
      <h2>Welcome, {playerName}</h2>
      
      <h2 style={{ textAlign: 'left' }}>Score: {score}</h2>
      <h2 style={{ textAlign: 'right' }}>Time: {formatElapsedTime(elapsedTime)}</h2>
      <div className="tile-grid" style={{ border: '3px solid black' }}>
        {tiles.map((content, index) => (
          <Tile
            key={index}
            id={index}
            content={content}
            handleTileClick={handleTileClick}
            flipped={flippedTiles.includes(index)}
            matched={matchedTiles.includes(index)}
          />
        ))}
      </div>
    </div>
  );
}

function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function formatElapsedTime(seconds) {
  // Format seconds into MM:SS
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

export default GameBoard;
