import React from 'react';

function SuccessScreen({ score, time, resetGame, playerName }) {
  return (
    <div className="success-screen" style={{ border: '3px solid black' }}>
      <h1>React Tiles</h1>
      <br/>
      <br/>
      <h1>Game Finished!</h1>
      <h1>Congratulations, {playerName}!</h1>
      <p>Your score: {score}</p>
      <p>Time taken: {time}</p>
      <button onClick={resetGame}>Play Again</button>
    </div>
  );
}

export default SuccessScreen;
