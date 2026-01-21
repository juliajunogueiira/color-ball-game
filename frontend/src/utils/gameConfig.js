// Game levels configuration (5 levels)
export const LEVELS = {
  // Very Easy levels (1-2)
  1: {
    speed: 1.2,
    colors: ["#FF0080", "#00FFFF", "#00FF00"], // Pink, Cyan, Green
    spawnRate: 2500,
    ballSize: 20,
    zigzag: false,
  },
  2: {
    speed: 1.4,
    colors: ["#FF0080", "#00FFFF", "#00FF00"],
    spawnRate: 2400,
    ballSize: 20,
    zigzag: false,
  },
  // Easy levels (3-4)
  3: {
    speed: 1.8,
    colors: ["#FF0080", "#00FFFF", "#00FF00"],
    spawnRate: 2200,
    ballSize: 20,
    zigzag: false,
  },
  4: {
    speed: 2.2,
    colors: ["#FF0080", "#00FFFF", "#00FF00"],
    spawnRate: 2000,
    ballSize: 20,
    zigzag: false,
  },
  5: {
    speed: 2.6,
    colors: ["#FF0080", "#00FFFF", "#00FF00"],
    spawnRate: 1800,
    ballSize: 20,
    zigzag: false,
  },
};

export const GAME_CONFIG = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  CANNON_WIDTH: 40,
  CANNON_HEIGHT: 50,
  CANNON_SPEED: 8,
  PROJECTILE_SIZE: 8,
  PROJECTILE_SPEED: 8,
  MAX_LIVES: 3,
  POINTS_CORRECT: 100,
  POINTS_WRONG: -50,
  MAX_LEVEL: 5,
};

export const getColorName = (hex) => {
  const colorMap = {
    "#FF0080": "Pink",
    "#00FFFF": "Cyan",
    "#00FF00": "Green",
    "#FFFF00": "Yellow",
    "#FF6600": "Orange",
    "#FF9933": "Light Orange",
    "#FF33FF": "Magenta",
  };
  return colorMap[hex] || hex;
};
