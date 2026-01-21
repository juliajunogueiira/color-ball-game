import React from 'react';
import '../styles/modal.css';

export default function MainMenu({ onStartGame, highScore }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content main-menu">
        <div className="game-title">
          <h1>COLOR BALL</h1>
          <p className="subtitle">CAR GAME</p>
        </div>

        <div className="menu-info">
          <p>High Score: <span className="highlight">{highScore}</span></p>
        </div>

        <div className="instructions">
          <h3>HOW TO PLAY</h3>
          <ul>
            <li>🖱️ Move car with arrow keys</li>
            <li>🎯 Match ball colors with your car color</li>
            <li>🎮 5 levels with increasing difficulty</li>
            <li>💔 Lose 1 life if the car doesn't hit the ball</li>
          </ul>
        </div>

        <button className="btn btn-primary btn-large" onClick={onStartGame}>
          START GAME
        </button>
      </div>
    </div>
  );
}
