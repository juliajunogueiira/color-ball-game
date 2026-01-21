import React from 'react';
import '../styles/ui.css';

export default function GameUI({ score, highScore, level, lives, isPaused, onPause, onRestart, onQuit }) {
  return (
    <div className="game-ui">
      <div className="ui-item score">
        <span className="label">SCORE</span>
        <span className="value">{score}</span>
      </div>
      <div className="ui-item level">
        <span className="label">LEVEL</span>
        <span className="value">{level}/5</span>
      </div>
      <div className="ui-item high-score">
        <span className="label">HIGH SCORE</span>
        <span className="value">{highScore}</span>
      </div>
      <div className="ui-item lives">
        <span className="label">LIVES</span>
        <span className="value">{'❤️'.repeat(lives)}</span>
      </div>

      <div className="game-controls">
        <button className="control-btn pause-btn" onClick={onPause} title="Space: Pause/Resume">
          {isPaused ? '▶' : '⏸'}
        </button>
        <button className="control-btn restart-btn" onClick={onRestart} title="R: Restart">
          🔄
        </button>
        <button className="control-btn quit-btn" onClick={onQuit} title="ESC: Menu">
          ⏹
        </button>
      </div>
    </div>
  );
}
