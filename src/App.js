import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen'
import GameBoard from './components/GameBoard';
import SuccessScreen from './components/SuccessScreen';
import './App.css';

function App() {
  const [playerName, setPlayerName] = useState(localStorage.getItem('playerName') || '');
  const [gameState, setGameState] = useState({
    started: false,
    finished: false,
    score: 0,
    time: 0
  });

  const startGame = (name) => {
    setPlayerName(name);
    setGameState({ ...gameState, started: true, finished: false, score: 0, time: 0 });
  };

  const finishGame = (score, time) => {
    setGameState({ ...gameState, finished: true, score, time });
  };

  const resetGame = () => {
    setGameState({ ...gameState, started: false, finished: false, score: 0, time: 0 });
  };

  return (
    <div className="App">
      {!gameState.started && !gameState.finished && (
        <WelcomeScreen onStartGame={startGame} playerName={playerName} />
      )}
      {gameState.started && !gameState.finished && (
        <GameBoard playerName={playerName} finishGame={finishGame} />
      )}
      {gameState.finished && (
        <SuccessScreen score={gameState.score} time={gameState.time} resetGame={resetGame} playerName={playerName} />
      )}
    </div>
  );
}

export default App;
