import React, { useState } from 'react';
import './WelcomeScreen.css';

function WelcomeScreen({ onStartGame }) {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('playerName', name);
    onStartGame(name);
  };

  return (
    <div className="welcome-screen">
      <h1>React Tiles</h1>
      <div className='borderwelcome'>
      <h1>Enter Your Name</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your Name"
          required
        />
        <br/>
        <br/>
        <button type="submit" className='buttons'>Play</button>
        <br/>
      </form>
      </div>
    </div>
  );
}

export default WelcomeScreen;
