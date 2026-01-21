import { GAME_CONFIG, LEVELS } from "./gameConfig";
import { Ball, Projectile, Cannon, Particle } from "./gameObjects";

export class GameEngine {
  constructor(
    canvasWidth = GAME_CONFIG.CANVAS_WIDTH,
    canvasHeight = GAME_CONFIG.CANVAS_HEIGHT,
  ) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.level = 1;
    this.score = 0;
    this.lives = GAME_CONFIG.MAX_LIVES;
    this.gameOver = false;
    this.levelComplete = false;
    this.paused = false;

    this.cannon = new Cannon(
      canvasWidth / 2,
      canvasHeight - GAME_CONFIG.CANNON_HEIGHT,
    );
    this.balls = [];
    this.projectiles = [];
    this.particles = [];

    this.lastSpawnTime = 0;
    this.keysPressed = {};

    // Car physics for inertia and rotation
    this.carVelocity = 0;
    this.carRotation = 0;
    this.targetRotation = 0;

    this.nextBallId = 0;

    // Load car SVG image
    this.carImage = null;
    this.loadCarImage();
  }

  loadCarImage() {
    const img = new Image();
    img.src = "/src/styles/carrace.png";
    img.onload = () => {
      this.carImage = img;
    };
    img.onerror = () => {
      console.warn(
        "Failed to load carrace.png, will fallback to canvas drawing",
      );
    };
  }

  getCurrentLevelConfig() {
    return LEVELS[Math.min(this.level, GAME_CONFIG.MAX_LEVEL)];
  }

  getRandomColor() {
    const config = this.getCurrentLevelConfig();
    return config.colors[Math.floor(Math.random() * config.colors.length)];
  }

  spawnBall(currentTime) {
    const config = this.getCurrentLevelConfig();
    if (currentTime - this.lastSpawnTime > config.spawnRate) {
      const color = this.getRandomColor();
      // Spawn balls in center area, avoiding corners
      const centerWidth = this.canvasWidth * 0.6; // 60% do centro
      const startX = (this.canvasWidth - centerWidth) / 2; // Começar 20% do lado
      const x = Math.random() * centerWidth + startX;
      const ball = new Ball(
        x,
        color,
        config.speed,
        config.ballSize,
        this.canvasWidth,
        this.canvasHeight,
        this.level,
      );
      this.balls.push(ball);
      this.lastSpawnTime = currentTime;
    }
  }

  update(currentTime) {
    if (this.gameOver || this.levelComplete || this.paused) return;

    const config = this.getCurrentLevelConfig();
    this.spawnBall(currentTime);

    // Movement: F1 car instead of cannon
    if (
      this.keysPressed["ArrowLeft"] ||
      this.keysPressed["a"] ||
      this.keysPressed["A"]
    ) {
      this.cannon.setPosition(
        Math.max(125, this.cannon.x - GAME_CONFIG.CANNON_SPEED),
      );
    }
    if (
      this.keysPressed["ArrowRight"] ||
      this.keysPressed["d"] ||
      this.keysPressed["D"]
    ) {
      this.cannon.setPosition(
        Math.min(
          this.canvasWidth - 125,
          this.cannon.x + GAME_CONFIG.CANNON_SPEED,
        ),
      );
    }

    // Cycling color
    this.cannon.setColor(
      config.colors[Math.floor((currentTime / 500) % config.colors.length)],
    );

    // Update balls
    this.balls.forEach((ball) => {
      ball.update();
    });

    // Update particles
    this.particles.forEach((particle) => {
      particle.update();
    });

    // Check collisions with car
    this.checkCollisionsWithCannon();

    // Check for balls reaching the bottom
    this.balls.forEach((ball) => {
      if (ball.y > this.canvasHeight) {
        ball.alive = false;
        this.lives--;
        if (this.lives <= 0) {
          this.gameOver = true;
        }
      }
    });

    // Remove dead objects
    this.balls = this.balls.filter((b) => b.alive);
    this.particles = this.particles.filter((p) => p.isAlive());

    // Level change: 400 points per level
    if (this.score >= 400 * this.level) {
      this.levelComplete = true;
    }
  }

  checkCollisionsWithCannon() {
    // Hotbox: front wing area (top of car)
    const frontWingX = this.cannon.x;
    const frontWingY = this.cannon.y - 15; // Front wing position
    const frontWingRadius = 22; // Collision radius

    for (let i = this.balls.length - 1; i >= 0; i--) {
      const ball = this.balls[i];
      const dx = ball.getX() - frontWingX;
      const dy = ball.y - frontWingY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < frontWingRadius + ball.size) {
        if (ball.color === this.cannon.currentColor) {
          // Correct color: +100
          this.score += GAME_CONFIG.POINTS_CORRECT;
          this.createExplosion(ball.getX(), ball.y, ball.color);
          this.createSparks(frontWingX, frontWingY, ball.color);
        } else {
          // Wrong color: -50
          this.score = Math.max(0, this.score + GAME_CONFIG.POINTS_WRONG);
        }
        ball.alive = false;
      }
    }
  }

  createSparks(x, y, color) {
    // More dynamic sparks that spread outward
    const sparkCount = 12;
    for (let i = 0; i < sparkCount; i++) {
      const angle = (i / sparkCount) * Math.PI * 2;
      const spreadSpeed = 4 + Math.random() * 3;
      const vx = Math.cos(angle) * spreadSpeed;
      const vy = Math.sin(angle) * spreadSpeed - 2; // Slight upward bias

      const particle = new Particle(x, y, color, vx, vy);
      particle.lifetime = 600; // Sparks live longer
      this.particles.push(particle);
    }
  }

  createExplosion(x, y, color) {
    const particleCount = 8;
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const speed = 3 + Math.random() * 2;
      const particle = new Particle(
        x,
        y,
        color,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
      );
      this.particles.push(particle);
    }
  }

  nextLevel() {
    if (this.level < GAME_CONFIG.MAX_LEVEL) {
      this.level++;
      this.score = 400 * (this.level - 1);
      this.balls = [];
      this.projectiles = [];
      this.particles = [];
      this.levelComplete = false;
      this.lastSpawnTime = 0;
      this.cannon.setPosition(this.canvasWidth / 2);
    } else {
      this.gameOver = true;
    }
  }

  togglePause() {
    this.paused = !this.paused;
  }

  restart() {
    this.level = 1;
    this.score = 0;
    this.lives = GAME_CONFIG.MAX_LIVES;
    this.gameOver = false;
    this.levelComplete = false;
    this.paused = false;
    this.cannon.setPosition(this.canvasWidth / 2);
    this.balls = [];
    this.projectiles = [];
    this.particles = [];
    this.lastSpawnTime = 0;
  }

  handleKeyDown(key) {
    this.keysPressed[key] = true;
  }

  handleKeyUp(key) {
    this.keysPressed[key] = false;
  }

  handleMouseMove(x, y) {
    // Move the car to follow the mouse position
    this.mouseX = x;
    this.mouseY = y;
    // Keep car within bounds: 125 to canvasWidth - 125
    const constrainedX = Math.max(125, Math.min(this.canvasWidth - 125, x));
    this.cannon.setPosition(constrainedX);
  }

  handleMouseClick() {
    // Handle mouse click (not used in current implementation but kept for compatibility)
  }

  draw(ctx) {
    // Background
    ctx.fillStyle = "#0a0e27";
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Grid background
    ctx.strokeStyle = "rgba(0, 255, 200, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i < this.canvasWidth; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, this.canvasHeight);
      ctx.stroke();
    }

    // Draw balls
    this.balls.forEach((ball) => ball.draw(ctx));

    // Draw F1 car
    this.drawF1Car(ctx);

    // Draw particles
    this.particles.forEach((particle) => particle.draw(ctx));

    // Draw pause indicator
    if (this.paused) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      ctx.fillStyle = "#00ff88";
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("PAUSADO", this.canvasWidth / 2, this.canvasHeight / 2);
    }
  }

  drawF1Car(ctx) {
    const x = this.cannon.x;
    const y = this.cannon.y;
    const carColor = this.cannon.currentColor || "#ff0055";

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((this.carRotation * Math.PI) / 180);

    // Draw PNG image with glow effect
    if (this.carImage) {
      ctx.filter = `drop-shadow(0 0 25px ${carColor}) drop-shadow(0 0 10px ${carColor})`;
      ctx.globalAlpha = 1;
      ctx.drawImage(this.carImage, -125, -125, 250, 250);
      ctx.filter = "none";
    }

    ctx.restore();
  }
}
