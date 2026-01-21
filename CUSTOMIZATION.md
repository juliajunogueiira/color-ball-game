# 🎨 Guia de Customização

Exemplos práticos para personalizar o jogo conforme suas preferências.

---

## 1️⃣ Modificar Dificuldade dos Níveis

### Aumentar Velocidade Geral

**Arquivo**: `frontend/src/utils/gameConfig.js`

```javascript
// Antes (normal)
export const LEVELS = {
  1: { speed: 2, ... }
};

// Depois (2x mais rápido)
export const LEVELS = {
  1: { speed: 4, ... }  // Multiplicar por 2
};
```

### Reduzir Tempo Entre Bolas

```javascript
// Mais bolas aparecem (mais desafio)
const LEVELS = {
  1: {
    spawnRate: 1000, // Era 2000 - aparece 2x mais rápido
  },
};
```

### Aumentar Tamanho das Bolas

```javascript
// Bolas maiores = mais fácil acertar
const LEVELS = {
  1: {
    ballSize: 25, // Era 20
  },
};
```

---

## 2️⃣ Modificar Sistema de Pontuação

### Arquivo: `frontend/src/utils/gameEngine.js` (classe GameEngine)

```javascript
// Aumentar pontos por acerto
POINTS_CORRECT: 250,  // Era 100

// Aumentar penalidade por erro
POINTS_WRONG: -100,   // Era -50

// Ou mudar na detecção de colisão
checkCollisions() {
  if (projectile.color === ball.color) {
    this.score += 500;  // Aumentado!
  } else {
    this.score -= 150;  // Penalidade maior
  }
}
```

---

## 3️⃣ Mudar Cores do Jogo

### Cores das Bolas por Nível

```javascript
// Em gameConfig.js
const LEVELS = {
  1: {
    colors: [
      "#00FF00", // Verde
      "#FF00FF", // Magenta
      "#00FFFF", // Ciano
    ],
  },
  // ...
};
```

### Cores Recomendadas (Neon Safe)

```
#FF0080 - Pink/Magenta
#00FFFF - Cyan
#00FF00 - Green
#FFFF00 - Yellow
#FF6600 - Orange
#FF33FF - Magenta
#0099FF - Light Blue
```

### Mudar Cor do Canhão

```javascript
// Em gameEngine.js, na classe GameEngine update()
// Mudar cor dinâmica do canhão
this.cannon.setColor("#FF00FF"); // Sempre magenta

// Ou ciclar entre cores
const colors = config.colors;
this.cannon.setColor(colors[0]); // Sempre primeira cor
```

---

## 4️⃣ Ajustar Controles

### Velocidade de Movimento do Canhão

```javascript
// Em gameConfig.js
export const GAME_CONFIG = {
  CANNON_SPEED: 12, // Era 8 (mais rápido)
};
```

### Adicionar Controle com Mouse Wheel

```javascript
// Em GameCanvas.jsx
const handleWheel = (e) => {
  e.preventDefault();
  if (e.deltaY < 0) {
    engine.cannon.setPosition(engine.cannon.x - GAME_CONFIG.CANNON_SPEED);
  } else {
    engine.cannon.setPosition(engine.cannon.x + GAME_CONFIG.CANNON_SPEED);
  }
};

canvas.addEventListener("wheel", handleWheel, { passive: false });
```

---

## 5️⃣ Mudar Dimensões do Canvas

### Aumentar Tamanho do Jogo

```javascript
// Em gameConfig.js
export const GAME_CONFIG = {
  CANVAS_WIDTH: 1024, // Era 800
  CANVAS_HEIGHT: 768, // Era 600
  // ...
};
```

### Ajustar Proporção

```javascript
// Canvas mais largo
CANVAS_WIDTH: 1200,
CANVAS_HEIGHT: 600
```

---

## 6️⃣ Modificar Vidas e Limites

### Aumentar Vidas Iniciais

```javascript
// Em gameConfig.js
MAX_LIVES: 5; // Era 3
```

### Mais Níveis

```javascript
// Em gameConfig.js - adicione mais níveis
16: { speed: 7.5, colors: [...], spawnRate: 700, ballSize: 14 },
17: { speed: 8.0, colors: [...], spawnRate: 650, ballSize: 14 },
// ...

// Atualize MAX_LEVEL
MAX_LEVEL: 20  // Era 15
```

---

## 7️⃣ Efeitos Visuais Customizáveis

### Aumentar Tamanho de Partículas

```javascript
// Em gameObjects.js, classe Particle
constructor(x, y, color, vx, vy) {
  // ...
  this.radius = 6;  // Era 4 (padrão)
}

// E no draw
ctx.beginPath();
ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);  // 6 em vez de 4
ctx.fill();
```

### Mais Partículas por Explosão

```javascript
// Em gameEngine.js
createExplosion(x, y, color) {
  const particleCount = 16;  // Era 8
  // ...
}
```

### Menos Glow (Performance)

```javascript
// Em gameObjects.js, Ball.draw()
// Remova o glow externo para mais performance
// const gradient = ctx.createRadialGradient(...);
// ctx.fillStyle = gradient;
// Apenas desenhe o círculo principal
```

---

## 8️⃣ Estilização & Tema

### Mudar Tema de Cores (CSS)

```css
/* Em styles/app.css */
.app {
  background: linear-gradient(135deg, #1a1a2e 0%, #2a1a4e 100%);
}

canvas {
  border-color: #ff00ff; /* Was #00FF00 */
  box-shadow: 0 0 20px #ff008080;
}
```

### Dark Mode

```css
/* Invertido */
.app {
  background: linear-gradient(135deg, #f0f0f0 0%, #e0e0ff 100%);
}

canvas {
  background: #ffffff;
  border-color: #000000;
}
```

### Fonte Diferente

```css
/* Em styles/app.css */
body {
  font-family: "Press Start 2P", monospace; /* Pixel style */
  /* ou */
  font-family: "Courier New", monospace; /* Classic */
}
```

---

## 9️⃣ API Backend Customização

### Mudar Porta

```javascript
// Em backend/server.js
const PORT = 8080; // Era 5000
```

### Adicionar Nova Rota

```javascript
app.get("/api/stats", (req, res) => {
  const scores = getScores();
  res.json({
    totalPlayers: scores.players.length,
    averageScore:
      scores.players.reduce((a, b) => a + b.score, 0) / scores.players.length,
    topScore: scores.globalHighScore,
  });
});
```

---

## 🔟 Exemplo Completo: Modo Fácil

Queremos deixar o jogo mais fácil para iniciantes:

```javascript
// gameConfig.js

// 1. Aumentar tempo de spawn
const LEVELS = {
  1: {
    speed: 1.5, // Reduzido (mais lento)
    colors: ["#00FF00", "#FF0080"], // Menos cores
    spawnRate: 3000, // Aumentado (menos bolas)
    ballSize: 25, // Maior (mais fácil acertar)
    zigzag: false,
  },
};

// 2. Mais vidas
MAX_LIVES: 5;

// 3. Mais pontos por acerto
POINTS_CORRECT: 150;

// 4. Canhão mais rápido
CANNON_SPEED: 12;
```

---

## 1️⃣1️⃣ Exemplo Completo: Modo Hardcore

Para jogadores experientes:

```javascript
// gameConfig.js

// 1. Muito mais rápido
const LEVELS = {
  1: {
    speed: 5,
    colors: ["#00FF00", "#FF0080", "#00FFFF", "#FFFF00"],
    spawnRate: 800, // Muitas bolas
    ballSize: 12, // Pequeno (difícil acertar)
    zigzag: true, // Desde o início
  },
};

// 2. Apenas 1 vida
MAX_LIVES: 1;

// 3. Menos pontos
POINTS_CORRECT: 50;
POINTS_WRONG: -200;

// 4. Canhão mais lento
CANNON_SPEED: 4;
```

---

## Recarregar Mudanças

Depois de editar:

1. **Pare o servidor** (Ctrl+C no terminal)
2. **Salve as mudanças**
3. **Reinicie**:

   ```bash
   npm start      # Backend
   npm run dev    # Frontend
   ```

4. **Limpe cache do navegador** (F5 ou Ctrl+Shift+Delete)

---

## Dicas de Customização

✅ **Boas práticas:**

- Mude um valor por vez para testar
- Mantenha valores em ranges realistas
- Teste em diferentes resoluções

⚠️ **Cuidado:**

- Não deixe `speed` muito alto (pode crashear)
- `spawnRate` muito baixo = lag
- Teste a dificuldade progressão

📝 **Documentação:**

- Sempre comentar mudanças
- Manter backup de `gameConfig.js`
- Versionamento com git

---

## Combinações Interessantes

### 🎮 Survival Mode

```javascript
speed: 10,
spawnRate: 500,
ballSize: 10,
colors: 7 (todas),
MAX_LIVES: 1
```

### 🎯 Precision Mode

```javascript
speed: 1,
spawnRate: 3000,
ballSize: 8,  // Muito pequeno
colors: 7,
MAX_LIVES: 5
```

### ⚡ Time Attack

```javascript
// Limite de tempo ao invés de vidas
// (requer mudança no engine)
TIME_LIMIT: 60000  // 1 minuto
speed: 5,
spawnRate: 1000
```

---

Aproveite personalizando! 🎨✨
