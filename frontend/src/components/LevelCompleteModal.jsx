import React from 'react';
import '../styles/modal.css';

export default function LevelCompleteModal({ level, score, onNextLevel }) {
  const message = level === 5 ? '🏆 YOU WIN! 🏆' : `Level ${level} Complete!`;
  const buttonText = level === 5 ? 'VIEW RESULTS' : 'NEXT LEVEL';

  return (
    <div className="modal-overlay">
      <div className="modal-content level-complete-modal">
        <h1>{message}</h1>
        <div className="level-info">
          <p>Current Score: <span className="highlight">{score}</span></p>
          {level < 5 && <p>Get ready for Level {level + 1}...</p>}
        </div>
        <button className="btn btn-primary" onClick={onNextLevel}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}
