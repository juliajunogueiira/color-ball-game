# 🎮 Color Ball Game - Documentação Técnica

## 📋 Resumo do Projeto

Um jogo arcade em **tempo real** desenvolvido com as melhores práticas modernas de desenvolvimento web.

**Stack Utilizado:**

- **Frontend**: React 18 + Vite + Canvas HTML5
- **Backend**: Node.js + Express.js
- **Estilização**: CSS3 com animações neon
- **Persistência**: JSON (arquivo local)

---

## 🏗️ Arquitetura Implementada

### Frontend (React + Canvas)

#### Componentes Principais:

1. **GameCanvas.jsx**
   - Componente que renderiza o canvas do jogo
   - Gerencia eventos de teclado
   - Implementa o game loop com `requestAnimationFrame`
   - Atualiza a lógica do jogo 60 vezes por segundo

2. **GameUI.jsx**
   - Painel flutuante com estatísticas em tempo real
   - Exibe: Pontuação, Nível, Recorde, Vidas
   - Atualiza dinamicamente durante o jogo

3. **GameOverModal.jsx**
   - Tela exibida ao perder o jogo
   - Mostra score final e nível atingido
   - Alerta visual de novo recorde

4. **LevelCompleteModal.jsx**
   - Transição entre níveis
   - Mostra mensagem especial no nível 15 (vitória)

5. **MainMenu.jsx**
   - Menu inicial com instruções de jogo
   - Exibe recorde global

#### Lógica do Jogo (Game Engine)

**arquivo: gameEngine.js**

```javascript
class GameEngine {
  update(currentTime) {
    // 1. Spawn de bolas aleatórias
    this.spawnBall(currentTime);

    // 2. Atualizar física
    this.balls.forEach((ball) => ball.update());
    this.projectiles.forEach((p) => p.update());

    // 3. Detecção de colisão
    this.checkCollisions();

    // 4. Remover objetos fora da tela
    this.balls = this.balls.filter((b) => b.alive);
  }
}
```

#### Objetos do Jogo (gameObjects.js)

1. **Ball**
   - Bola que desce do topo
   - Suporta movimento em zigue-zague (níveis altos)
   - Propriedades: posição, cor, tamanho, velocidade

2. **Projectile**
   - Projétil disparado pelo canhão
   - Detecta colisão usando distância Euclidiana
   - Destrói-se ao sair da tela

3. **Cannon**
   - Canhão controlável do jogador
   - Muda de cor dinamicamente
   - Rotaciona com o movimento do mouse

4. **Particle**
   - Partículas de explosão ao acertar bola
   - Simula gravidade e arrasto

#### Sistema de Níveis (15 Níveis)

**gameConfig.js - Configuração Progressiva:**

| Nível | Dificuldade | Cores | Velocidade | Spawn Rate | Zigzag |
| ----- | ----------- | ----- | ---------- | ---------- | ------ |
| 1-5   | 🟢 Fácil    | 3     | 2.0-3.2    | 1600-2000  | ❌     |
| 6-10  | 🟡 Médio    | 5     | 3.5-4.7    | 1100-1500  | ✅     |
| 11-15 | 🔴 Difícil  | 7     | 5.5-7.2    | 800-1000   | ✅     |

### Backend (Node.js + Express)

**server.js**

Endpoints REST implementados:

#### GET `/api/high-score`

```javascript
// Retorna o maior recorde global
{
  "highScore": 15000
}
```

#### POST `/api/score`

```javascript
// Salva novo recorde do jogador
{
  "playerName": "Player123",
  "score": 15000
}
```

Resposta:

```javascript
{
  "success": true,
  "highScore": 15000
}
```

#### GET `/api/leaderboard`

```javascript
// Retorna top 10 jogadores
[
  { name: "Player1", score: 15000 },
  { name: "Player2", score: 12000 },
  // ...
];
```

**Persistência:**

- Arquivo `scores.json` armazena todos os recordes
- Sincronização automática em tempo real
- Suporta múltiplos jogadores

---

## 🎯 Mecânica do Jogo

### Game Loop

```
┌─────────────────────────────┐
│   requestAnimationFrame     │
│  (60 FPS = ~16ms por frame) │
└──────────────┬──────────────┘
               │
       ┌───────▼────────┐
       │ Spawn Balls    │ (controlado por spawnRate)
       └───────┬────────┘
               │
       ┌───────▼────────┐
       │ Update Entites │ (posição, velocidade)
       └───────┬────────┘
               │
       ┌───────▼─────────────┐
       │ Collision Detection │ (distância Euclidiana)
       └───────┬─────────────┘
               │
       ┌───────▼────────┐
       │ Draw to Canvas │ (renderizar gráficos)
       └────────────────┘
```

### Detecção de Colisão

Fórmula de distância Euclidiana:

$$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

Colisão ocorre quando:

$$d < r_{projétil} + r_{bola}$$

```javascript
collidesWith(ball) {
  return this.distanceTo(ball) < this.size + ball.size;
}
```

### Controles

**Mouse:**

- Movimento do canhão acompanha cursor
- Clique dispara projétil

**Teclado:**

- Seta Esquerda / A: Move canhão à esquerda
- Seta Direita / D: Move canhão à direita
- Teclas armazenadas em `keysPressed` para movimento suave

---

## 🎨 Estilização Neon

### Cores Primárias

| Cor        | Hex     | Uso            |
| ---------- | ------- | -------------- |
| Verde Neon | #00FF00 | Canhão, Border |
| Rosa Neon  | #FF0080 | UI, Modal      |
| Ciano      | #00FFFF | Texto destaque |
| Amarelo    | #FFFF00 | Pontuação      |

### Efeitos Visuais

1. **Glow Effects**
   - Canvas radial gradients para bolas e projéteis
   - Text-shadow para neon text
   - Box-shadow para borders animados

2. **Animações CSS**
   - `neonGlow`: Pulsação contínua
   - `fadeIn`: Transição de modais
   - `slideIn`: Entrada de conteúdo
   - `pulse`: Destaque de novo recorde

3. **Responsividade**
   - Breakpoints: 1024px, 768px
   - Canvas escala dinamicamente
   - UI se adapta em mobile

---

## 📊 Sistema de Pontuação

### Pontos

| Ação                | Pontos               |
| ------------------- | -------------------- |
| Acertar cor correta | +100                 |
| Errar cor           | -50                  |
| Bola atingir base   | -1 vida (sem pontos) |
| Novo recorde        | Bônus visual 🎉      |

### Progressão

- Completar nível = nenhum bônus (apenas progresso)
- Cada nível mais difícil = mais oportunidades de pontos
- Alta score persiste localmente e no backend

---

## 🔧 Customização

### Modificar Velocidade dos Níveis

**Em `frontend/src/utils/gameConfig.js`:**

```javascript
LEVELS = {
  1: {
    speed: 2, // Aumentar para mais rápido
    // ...
  },
};
```

### Adicionar Novas Cores

```javascript
const LEVELS = {
  1: {
    colors: ["#FF0080", "#00FFFF", "#00FF00", "#FFFFFF"],
    // ...
  },
};
```

### Mudar Pontuação

**Em `GAME_CONFIG`:**

```javascript
POINTS_CORRECT: 200,  // Antes era 100
POINTS_WRONG: -100,   // Antes era -50
```

### Aumentar Número de Níveis

Edite `LEVELS` em `gameConfig.js` e aumente `MAX_LEVEL` em `GAME_CONFIG`.

---

## 🚀 Deploy

### Frontend (Vercel/Netlify)

```bash
cd frontend
npm run build
# Deploy pasta 'dist/'
```

### Backend (Heroku/Railway)

```bash
cd backend
npm install
npm start
# Definir variável de ambiente: PORT=process.env.PORT || 5000
```

---

## 📈 Performance

- **Canvas Rendering**: ~16ms por frame (60 FPS)
- **Detecção de Colisão**: O(n\*m) simplificado com limite de bolas
- **Memory**: ~10-20MB durante jogo normal
- **Network**: API calls apenas para salvar recorde

---

## 🐛 Problemas Conhecidos

1. **Mobile**: Controle via mouse pode ser impreciso (considerar touch events)
2. **Lags**: Em máquinas antigas com muitas bolas (adicionar pool de objetos)
3. **Offline**: Backend opcional (cai para localStorage)

---

## 📝 Licença

Projeto open-source para fins educacionais e de entretenimento.

---

**Desenvolvido com ❤️ em 2026**
