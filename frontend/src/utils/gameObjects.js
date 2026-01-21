import { GAME_CONFIG } from "./gameConfig";

export class Ball {
  constructor(x, color, speed, size, canvasWidth, canvasHeight, level) {
    this.x = x;
    this.y = -size;
    this.color = color;
    this.speed = speed;
    this.size = size;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.alive = true;
    this.level = level;
    this.zigzagOffset = 0;
    this.zigzagDirection = 1;
  }

  update() {
    this.y += this.speed;

    // Zigzag movement for harder levels
    if (this.level > 8) {
      this.zigzagOffset += this.zigzagDirection * 0.5;
      if (Math.abs(this.zigzagOffset) > 20) {
        this.zigzagDirection *= -1;
      }
    }

    // Check if ball reached the bottom
    if (this.y > this.canvasHeight) {
      this.alive = false;
    }
  }

  getX() {
    return this.x + this.zigzagOffset;
  }

  draw(ctx) {
    const x = this.getX();

    // Draw outer glow
    const gradient = ctx.createRadialGradient(
      x,
      this.y,
      0,
      x,
      this.y,
      this.size + 5,
    );
    gradient.addColorStop(0, this.color + "33");
    gradient.addColorStop(1, this.color + "00");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, this.y, this.size + 5, 0, Math.PI * 2);
    ctx.fill();

    // Draw main ball
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    // Draw inner highlight
    ctx.fillStyle = "#FFFFFF99";
    ctx.beginPath();
    ctx.arc(
      x - this.size / 3,
      this.y - this.size / 3,
      this.size / 3,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }
}

export class Projectile {
  constructor(x, y, color, angle) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.angle = angle;
    this.speed = GAME_CONFIG.PROJECTILE_SPEED;
    this.size = GAME_CONFIG.PROJECTILE_SIZE;
    this.alive = true;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y -= Math.sin(this.angle) * this.speed;

    // Check if projectile went out of bounds
    if (
      this.y < -this.size ||
      this.x < -this.size ||
      this.x > GAME_CONFIG.CANVAS_WIDTH + this.size
    ) {
      this.alive = false;
    }
  }

  draw(ctx) {
    // Draw outer glow
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size + 3,
    );
    gradient.addColorStop(0, this.color + "33");
    gradient.addColorStop(1, this.color + "00");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size + 3, 0, Math.PI * 2);
    ctx.fill();

    // Draw main projectile
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  distanceTo(ball) {
    const dx = this.x - ball.getX();
    const dy = this.y - ball.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  collidesWith(ball) {
    return this.distanceTo(ball) < this.size + ball.size;
  }
}

export class Cannon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = Math.PI / 2; // Pointing up
    this.currentColor = "#FF0080";
    this.width = GAME_CONFIG.CANNON_WIDTH;
    this.height = GAME_CONFIG.CANNON_HEIGHT;
  }

  setPosition(x) {
    this.x = Math.max(
      this.width / 2,
      Math.min(x, GAME_CONFIG.CANVAS_WIDTH - this.width / 2),
    );
  }

  setAngle(angle) {
    this.angle = Math.max(Math.PI / 4, Math.min(angle, (3 * Math.PI) / 4));
  }

  setColor(color) {
    this.currentColor = color;
  }

  draw(ctx) {
    // Draw cannon base
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height / 2);

    // Draw cannon barrel with glow
    const barrelEndX = this.x + Math.cos(this.angle) * this.height;
    const barrelEndY = this.y - Math.sin(this.angle) * this.height;

    // Glow effect
    const gradient = ctx.createLinearGradient(
      this.x,
      this.y,
      barrelEndX,
      barrelEndY,
    );
    gradient.addColorStop(0, this.currentColor + "99");
    gradient.addColorStop(1, this.currentColor + "33");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(barrelEndX, barrelEndY);
    ctx.stroke();

    // Main barrel
    ctx.strokeStyle = this.currentColor;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(barrelEndX, barrelEndY);
    ctx.stroke();

    // Cannon tip glow
    ctx.fillStyle = this.currentColor;
    ctx.beginPath();
    ctx.arc(barrelEndX, barrelEndY, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  getProjectileStartPos() {
    return {
      x: this.x + Math.cos(this.angle) * (this.height - 10),
      y: this.y - Math.sin(this.angle) * (this.height - 10),
    };
  }
}

export class Particle {
  constructor(x, y, color, vx, vy) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
    this.life = 30;
    this.maxLife = 30;
    this.lifetime = 30; // Can be customized for spark effects
    this.life = this.lifetime;
    this.maxLife = this.lifetime;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.2; // Gravity
    this.life--;
  }

  draw(ctx) {
    const alpha = this.life / this.maxLife;
    ctx.fillStyle =
      this.color +
      Math.floor(alpha * 255)
        .toString(16)
        .padStart(2, "0");
    ctx.beginPath();
    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  isAlive() {
    return this.life > 0;
  }
}
