import React from 'react';
import './Tile.css'; 

function Tile({ id, content, handleTileClick, flipped, matched }) {
  return (
    <div className={`tile ${flipped ? 'flipped' : ''} ${matched ? 'matched' : ''}`} onClick={() => handleTileClick(id)}>
      {flipped || matched ? content : ''}
    </div>
  );
}

export default Tile;