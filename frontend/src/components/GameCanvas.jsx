import React, { useEffect, useRef, useState } from 'react';
import { GameEngine } from '../utils/gameEngine';
import { GAME_CONFIG } from '../utils/gameConfig';

export default function GameCanvas({ onGameOver, onLevelComplete, gameEngine, resetGame, onStatsUpdate }) {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const gameEngineRef = useRef(gameEngine);
  const statsUpdateRef = useRef(onStatsUpdate);

  useEffect(() => {
    gameEngineRef.current = gameEngine;
  }, [gameEngine]);

  useEffect(() => {
    statsUpdateRef.current = onStatsUpdate;
  }, [onStatsUpdate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const engine = gameEngineRef.current;
    let lastTime = Date.now();

    const gameLoop = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      engine.update(currentTime);
      engine.draw(ctx);

      // Update parent component with current stats
      if (statsUpdateRef.current) {
        statsUpdateRef.current({
          score: engine.score,
          lives: engine.lives,
          level: engine.level
        });
      }

      if (engine.gameOver) {
        onGameOver(engine.score, engine.level);
      }

      if (engine.levelComplete) {
        onLevelComplete(engine.level, engine.score);
      }

      animationIdRef.current = requestAnimationFrame(gameLoop);
    };

    animationIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [onGameOver, onLevelComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = gameEngineRef.current;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      engine.handleMouseMove(x, y);
    };

    const handleMouseClick = () => {
      engine.handleMouseClick();
    };

    const handleKeyDown = (e) => {
      engine.handleKeyDown(e.key);
      
      // Space: pause/resume
      if (e.key === ' ') {
        e.preventDefault();
        engine.togglePause();
      }
      
      // R: restart
      if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        engine.restart();
      }
      
      // ESC: quit to menu (handled by parent component)
      
      if (['ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e) => {
      engine.handleKeyUp(e.key);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleMouseClick);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleMouseClick);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return <canvas ref={canvasRef} width={GAME_CONFIG.CANVAS_WIDTH} height={GAME_CONFIG.CANVAS_HEIGHT} />;
}
