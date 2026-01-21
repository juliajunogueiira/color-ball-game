# Color Ball Game - Arcade Neon

Um jogo arcade em tempo real construído com **React (Vite)** no frontend e **Node.js (Express)** no backend. Controle um carro F1 de 250x250 pixels para capturar bolas coloridas que descem do topo em 5 níveis progressivos.

## 🎮 Características

- **5 Níveis Progressivos**:
  - Níveis 1-2 (Muito Fácil): 3 cores, velocidade baixa (1.2-1.4), muitos segundos entre bolas
  - Níveis 3-4 (Fácil): 3 cores, velocidade moderada (1.8-2.2), menos tempo de espera
  - Nível 5 (Normal): 3 cores, velocidade 2.6

- **Mecânica do Jogo**:
  - Bolas coloridas descem do **centro da tela** (não dos cantos)
  - Carro F1 (imagem PNG 250x250) controlado com mouse ou teclado (setas/A-D)
  - Carro se move suavemente de parede a parede
  - Acerte a cor certa do carro para ganhar 100 pontos
  - Erre ou deixe a bola chegar à base para perder 1 vida
  - Sistema de 3 vidas

- **Estilização**:
  - Visual neon/arcade moderno
  - Carro F1 renderizado como imagem PNG
  - Efeitos de glow dinâmicos nas cores
  - Interface responsiva
  - Animações suaves

- **Backend**:
  - API REST para salvar e carregar recordes globais
  - Persistência em arquivo JSON
  - Leaderboard com top 10 jogadores

## 📦 Requisitos

- **Node.js** (v14 ou superior)
- **npm** ou **yarn**

## 🚀 Instalação e Execução

### 1. Backend (Express)

```bash
# Navegue até a pasta do backend
cd backend

# Instale as dependências
npm install

# Inicie o servidor
npm start
# O servidor será iniciado em http://localhost:5000
```

### 2. Frontend (React + Vite)

Em outro terminal:

```bash
# Navegue até a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
# O jogo será aberto em http://localhost:3000
```

## 🎯 Como Jogar

1. **Tela de Menu**: Clique em "START GAME" para começar
2. **Controles**:
   - 🖱️ Mova o carro (F1) com o mouse
   - ⌨️ Ou use as setas do teclado (← / →) ou A / D
   - O carro muda de cor dinamicamente a cada nível
3. **Objetivo**: Acerte as bolas coloridas com a cor correspondente do carro
4. **Vidas**: Você começa com 3 vidas
5. **Progressão**: Complete os 5 níveis para vencer o jogo!
6. **Dica**: As bolas aparecem no centro da tela, não nos cantos

## 🏗️ Arquitetura do Projeto

```
task-app/
├── backend/
│   ├── package.json
│   ├── server.js          # Servidor Express
│   └── scores.json        # Arquivo de recordes (gerado automaticamente)
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── components/
        │   ├── GameCanvas.jsx      # Canvas principal do jogo
        │   ├── GameUI.jsx          # Painel de pontuação
        │   ├── GameOverModal.jsx   # Tela de fim de jogo
        │   ├── LevelCompleteModal.jsx # Conclusão de nível
        │   └── MainMenu.jsx        # Menu principal
        ├── utils/
        │   ├── gameConfig.js       # Configuração dos 15 níveis
        │   ├── gameEngine.js       # Lógica do game loop
        │   └── gameObjects.js      # Classes: Ball, Projectile, Cannon, Particle
        └── styles/
            ├── app.css
            ├── ui.css
            └── modal.css
```

## 🔧 Detalhes Técnicos

### Game Loop

- Utiliza `requestAnimationFrame` para atualizar a lógica do jogo a 60 FPS
- Atualiza posição de bolas, projéteis e partículas
- Detecta colisões usando distância Euclidiana

### Detecção de Colisão

```
d = √((x₂ - x₁)² + (y₂ - y₁)²)
```

Se `d < raio_projétil + raio_bola`, houve colisão

### Persistência de Dados

- **Frontend**: LocalStorage para high score local
- **Backend**: arquivo `scores.json` para recordes globais
- **API Endpoints**:
  - `GET /api/high-score` - Obtém o maior recorde global
  - `POST /api/score` - Salva novo recorde
  - `GET /api/leaderboard` - Top 10 jogadores

## 🎨 Customização

### Modificar Cores dos Níveis

Edite em `frontend/src/utils/gameConfig.js`:

```javascript
export const LEVELS = {
  1: {
    colors: ["#FF0080", "#00FFFF", "#00FF00"], // Pink, Cyan, Green
    // ... outras propriedades
  },
};
```

### Ajustar Dificuldade dos Níveis

Modifique `speed` e `spawnRate` em `gameConfig.js`:

- `speed`: velocidade das bolas (menor = mais fácil)
- `spawnRate`: tempo em ms entre spawns (maior = mais fácil)

### Ajustar Tamanho do Carro

Edite em `frontend/src/utils/gameEngine.js`, método `drawF1Car()`:

```javascript
ctx.drawImage(this.carImage, -125, -125, 250, 250); // Altere 250, 250
```

### Mudar Pontuação

Ajuste em `GAME_CONFIG` em `gameConfig.js`:

```javascript
POINTS_CORRECT: 100,  // Pontos por acertar
POINTS_WRONG: -50,    // Penalidade por errar
```

### Adicionar Mais Níveis

1. Adicione novos níveis em `LEVELS` em `gameConfig.js`
2. Atualize `MAX_LEVEL` para o novo número
3. Atualize referências a "5" no frontend para o novo máximo

## 🐛 Troubleshooting

**Jogo não conecta ao backend?**

- Certifique-se de que o backend está rodando em `http://localhost:5000`
- Verifique se há erros de CORS
- O jogo funciona offline - pontuações são salvas localmente
- No celular, use IP local: `http://192.168.1.5:3000`

**Porta 5000 já está em uso?**

- Windows: `netstat -ano | findstr :5000` para encontrar PID
- Então: `taskkill /PID <numero> /F`
- Reinicie com `node server.js`

**Imagem do carro não aparece?**

- Verifique se `carrace.png` está em `frontend/src/styles/`
- Caminho esperado no código: `/src/styles/carrace.png`
- Tamanho esperado: 250x250 pixels

**Vite não encontra as dependências?**

- Delete `node_modules` e `package-lock.json`
- Execute `npm install` novamente em `frontend/` e `backend/`

**Bolas aparecem nos cantos em vez do centro?**

- Verifique `spawnBall()` em `gameEngine.js`
- Deve usar: `(canvasWidth - centerWidth) / 2` para centralizar

**Canvas muito lento ou com lag?**

- Reduza `spawnRate` (tempo maior entre spawns)
- Diminua o número de partículas nos efeitos visuais
- Feche outras abas/programas

## 📊 Sistema de Pontuação

- Acertar a cor correta: **+100 pontos**
- Errar a cor: **-50 pontos**
- Bola atingir a base: **-1 vida**
- Ganhar recorde: **Bônus visual** 🎉

## 🚀 Recursos Futuros

- [ ] Efeitos sonoros (tiro, acerto, game over)
- [ ] Modo multiplayer
- [ ] Diferentes skins de canhão
- [ ] Power-ups (mais vida, disparo rápido)
- [ ] Banco de dados real (MongoDB/PostgreSQL)

## 📄 Licença

Este projeto é open-source e pode ser usado livremente.

---

**Desenvolvido com ❤️ e muita glow neon ✨**
