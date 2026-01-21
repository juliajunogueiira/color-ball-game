# Color Ball Game - Arcade Neon

Um jogo arcade em tempo real construído com **React (Vite)** no frontend e **Node.js (Express)** no backend. O objetivo é acertar bolas que descem da tela usando um canhão que dispara projéteis da mesma cor.

## 🎮 Características

- **15 Níveis Progressivos**:
  - Níveis 1-5 (Fácil): 3 cores, velocidade baixa
  - Níveis 6-10 (Médio): 5 cores, velocidade moderada
  - Níveis 11-15 (Difícil): 7 cores, velocidade alta com movimento em zigue-zague

- **Mecânica do Jogo**:
  - Bolas coloridas descem continuamente do topo
  - Canhão controlado com mouse ou teclado (setas/A-D)
  - Clique para disparar projéteis
  - Acerte a cor certa para ganhar 100 pontos
  - Erre ou deixe a bola chegar à base para perder 1 vida

- **Estilização**:
  - Visual neon/arcade moderno
  - Efeitos de glow em todos os elementos
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
   - 🖱️ Mova o canhão com o mouse
   - ⌨️ Ou use as setas do teclado (← / →) ou A / D
   - 🖱️ Clique para disparar
3. **Objetivo**: Acerte as bolas com a cor correspondente do projétil
4. **Vidas**: Você começa com 3 vidas
5. **Progressão**: Complete os níveis para enfrentar desafios maiores

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

### Ajustar Dificuldade

Modifique `speed`, `spawnRate` e `ballSize` em `gameConfig.js`

### Mudar Pontuação

Ajuste `POINTS_CORRECT` e `POINTS_WRONG` em `GAME_CONFIG`

## 🐛 Troubleshooting

**Jogo não conecta ao backend?**

- Certifique-se de que o backend está rodando em `http://localhost:5000`
- Verifique se não há erros de CORS
- O jogo funciona offline, usando localStorage como fallback

**Vite não encontra as dependências?**

- Delete `node_modules` e `package-lock.json`
- Execute `npm install` novamente

**Canvas muito lento?**

- Reduza a qualidade dos efeitos gráficos
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
