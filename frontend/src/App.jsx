import React, { useState, useEffect } from 'react';
import GameCanvas from './components/GameCanvas';
import GameUI from './components/GameUI';
import GameOverModal from './components/GameOverModal';
import LevelCompleteModal from './components/LevelCompleteModal';
import MainMenu from './components/MainMenu';
import { GameEngine } from './utils/gameEngine';
import './styles/app.css';

function App() {
  const [gameState, setGameState] = useState('menu'); // menu, playing, gameOver, levelComplete
  const [gameEngine, setGameEngine] = useState(null);
  const [highScore, setHighScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [finalLevel, setFinalLevel] = useState(0);
  const [gameStats, setGameStats] = useState({ score: 0, lives: 3, level: 1 });

  // Fetch high score from backend on mount
  useEffect(() => {
    const fetchHighScore = async () => {
      try {
        const response = await fetch('/api/high-score');
        const data = await response.json();
        setHighScore(data.highScore || 0);
      } catch (error) {
        console.log('Using local high score (backend unavailable)');
        const localHighScore = localStorage.getItem('highScore');
        if (localHighScore) {
          setHighScore(parseInt(localHighScore));
        }
      }
    };

    fetchHighScore();
  }, []);

  // Handle ESC key for menu
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && gameState === 'playing') {
        handleQuitToMenu();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [gameState, gameEngine]);

  const startGame = () => {
    const engine = new GameEngine();
    setGameEngine(engine);
    setGameState('playing');
  };

  const handleGameOver = async (score, level) => {
    setFinalScore(score);
    setFinalLevel(level);

    // Update high score if necessary
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score.toString());

      // Send to backend
      try {
        const playerName = localStorage.getItem('playerName') || 'Anonymous';
        await fetch('/api/score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ playerName, score })
        });
      } catch (error) {
        console.log('Could not save score to backend');
      }
    }

    setGameState('gameOver');
  };

  const handleLevelComplete = (level, score) => {
    setGameState('levelComplete');
  };

  const handleNextLevel = () => {
    if (gameEngine) {
      gameEngine.nextLevel();
      setGameState('playing');
      setGameStats({ score: gameEngine.score, lives: gameEngine.lives, level: gameEngine.level });
    }
  };

  const handleRestart = () => {
    startGame();
  };

  const handlePause = () => {
    if (gameEngine) {
      gameEngine.togglePause();
    }
  };

  const handleQuitToMenu = () => {
    if (gameEngine) {
      gameEngine.restart();
    }
    setGameState('menu');
    setGameStats({ score: 0, lives: 3, level: 1 });
  };

  return (
    <div className="app">
      <div className="game-container">
        {gameState === 'menu' && (
          <MainMenu onStartGame={startGame} highScore={highScore} />
        )}

        {gameState === 'playing' && gameEngine && (
          <>
            <GameUI
              score={gameStats.score}
              highScore={highScore}
              level={gameStats.level}
              lives={gameStats.lives}
              isPaused={gameEngine.paused}
              onPause={handlePause}
              onRestart={handleRestart}
              onQuit={handleQuitToMenu}
            />
            <GameCanvas
              gameEngine={gameEngine}
              onGameOver={handleGameOver}
              onLevelComplete={handleLevelComplete}
              onStatsUpdate={setGameStats}
            />
          </>
        )}

        {gameState === 'gameOver' && (
          <GameOverModal
            score={finalScore}
            level={finalLevel}
            highScore={highScore}
            onRestart={handleRestart}
          />
        )}

        {gameState === 'levelComplete' && gameEngine && (
          <LevelCompleteModal
            level={gameStats.level}
            score={gameStats.score}
            onNextLevel={handleNextLevel}
          />
        )}
      </div>
    </div>
  );
}

export default App;
