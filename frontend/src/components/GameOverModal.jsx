import React from 'react';
import '../styles/modal.css';

export default function GameOverModal({ score, level, highScore, onRestart }) {
  const isNewRecord = score > highScore;

  return (
    <div className="modal-overlay">
      <div className="modal-content game-over-modal">
        <h1>GAME OVER</h1>
        {isNewRecord && <p className="new-record">🎉 NEW RECORD! 🎉</p>}
        <div className="score-display">
          <p>Final Score: <span className="highlight">{score}</span></p>
          <p>Level Reached: <span className="highlight">{level}</span></p>
          <p>High Score: <span className="highlight">{highScore}</span></p>
        </div>
        <button className="btn btn-primary" onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
}
