╔═══════════════════════════════════════════════════════════════════════════╗
║ ║
║ 🎮 COLOR BALL GAME - INICIALIZAÇÃO 🎮 ║
║ ║
║ Jogo Arcade Neon em React + Node.js ║
║ ║
╚═══════════════════════════════════════════════════════════════════════════╝

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🚀 INICIALIZAÇÃO RÁPIDA ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

✅ REQUISITOS VERIFICADOS:
• Node.js v14+ ........................ INSTALADO ✓
• npm .................................. INSTALADO ✓
• Dependências backend ................. INSTALADAS ✓
• Dependências frontend ................ INSTALADAS ✓

┌─────────────────────────────────────────────────────────────────────────┐
│ OPÇÃO 1: Inicialização Automática (Recomendado) 🔧 │
└─────────────────────────────────────────────────────────────────────────┘

🪟 Windows (Command Prompt/PowerShell):

cd C:\Users\nogue\OneDrive\Área de Trabalho\task-app
start.bat

⏳ Aguarde 3 segundos
🎮 Jogo abrirá em: http://localhost:3000

🍎 macOS/Linux (Terminal):

cd ~/OneDrive/Área\ de\ Trabalho/task-app
chmod +x start.sh
./start.sh

⏳ Aguarde 3 segundos
🎮 Jogo abrirá em: http://localhost:3000

┌─────────────────────────────────────────────────────────────────────────┐
│ OPÇÃO 2: Inicialização Manual (2 Terminais) ⌨️ │
└─────────────────────────────────────────────────────────────────────────┘

📟 TERMINAL 1 - Backend:

cd C:\Users\nogue\OneDrive\Área de Trabalho\task-app\backend
npm start

✅ Esperado:
✅ Server running on http://localhost:5000

📟 TERMINAL 2 - Frontend:

cd C:\Users\nogue\OneDrive\Área de Trabalho\task-app\frontend
npm run dev

✅ Esperado:
➜ Local: http://localhost:3000/
➜ Press q to quit

┌─────────────────────────────────────────────────────────────────────────┐
│ VERIFICAÇÃO DE CONEXÃO 🔗 │
└─────────────────────────────────────────────────────────────────────────┘

✅ Backend funcionando?
• Abra: http://localhost:5000/api/high-score
• Esperado: { "highScore": 0 } ou número salvo
• Se erro: Verifique se backend está rodando

✅ Frontend funcionando?
• Abra: http://localhost:3000
• Esperado: Menu principal do jogo
• Se branco: Aguarde compilação Vite (primeira vez leva ~3s)

✅ Comunicação?
• Clique em "START GAME"
• Jogue até game over
• Se recorde não salva: Backend pode estar offline (use localStorage)

┌─────────────────────────────────────────────────────────────────────────┐
│ ESTRUTURA MÍNIMA ESPERADA ✓ │
└─────────────────────────────────────────────────────────────────────────┘

task-app/
├── backend/
│ ├── node_modules/ ✓ Pasta grande (~300MB)
│ ├── package.json ✓ 2 dependências
│ └── server.js ✓ ~60 linhas
│
└── frontend/
├── node_modules/ ✓ Pasta grande (~800MB)
├── package.json ✓ 2 dependências
├── src/
│ ├── components/ ✓ 5 arquivos .jsx
│ ├── utils/ ✓ 3 arquivos .js
│ └── styles/ ✓ 3 arquivos .css
└── vite.config.js ✓ Proxy configurado

┌─────────────────────────────────────────────────────────────────────────┐
│ PRIMEIROS PASSOS DO JOGO 🎮 │
└─────────────────────────────────────────────────────────────────────────┘

1️⃣ Clique em "START GAME"
└─> Você verá o canvas com Grade neon

2️⃣ Bolas começam a cair
└─> Cores: Pink, Cyan, Green (Nível 1)

3️⃣ Mova o canhão
└─> Mouse: Acompanha cursor
└─> Teclado: Setas (← →) ou A-D

4️⃣ Dispare
└─> Clique para atirar
└─> Canhão muda de cor dinamicamente

5️⃣ Acerte a cor correspondente
└─> Cor correta: +100 pontos 🎉
└─> Cor errada: -50 pontos ❌
└─> Bola na base: -1 vida ❤️

6️⃣ Complete os 15 níveis!
└─> Cada nível mais difícil
└─> Nível 15 = Vitória total! 🏆

┌─────────────────────────────────────────────────────────────────────────┐
│ TROUBLESHOOTING RÁPIDO 🆘 │
└─────────────────────────────────────────────────────────────────────────┘

❌ "npm: command not found"
→ Reinstale Node.js de https://nodejs.org/

❌ "Cannot find module"
→ cd backend && npm install
→ cd ../frontend && npm install

❌ "Port 5000 already in use"
→ Feche outro app usando porta 5000
→ Ou mude em backend/server.js: const PORT = 5001;

❌ "Port 3000 already in use"
→ Feche outro app usando porta 3000
→ Ou mude em frontend/vite.config.js: port: 3001

❌ Canvas branco/vazio
→ Aguarde compilação (primeira vez leva ~3s)
→ Atualize página (F5)
→ Verifique console (F12)

❌ Backend mostra erro
→ Verifique porta não está em uso
→ Remova scores.json e reinicie
→ Verifique permissão de escrita na pasta

❌ Recorde não salva
→ Backend pode estar offline (é normal)
→ Recorde salvo localmente em localStorage
→ Conecte backend depois para sincronizar

┌─────────────────────────────────────────────────────────────────────────┐
│ PORTAS E URLS 🔗 │
└─────────────────────────────────────────────────────────────────────────┘

Frontend (React):
URL: http://localhost:3000
Porta: 3000
Process: npm run dev (Vite)

Backend (Express):
URL: http://localhost:5000
Porta: 5000
Process: npm start

Endpoints API:
GET /api/high-score → Obtém recorde
POST /api/score → Salva novo recorde
GET /api/leaderboard → Top 10 jogadores

┌─────────────────────────────────────────────────────────────────────────┐
│ DOCUMENTAÇÃO DISPONÍVEL 📚 │
└─────────────────────────────────────────────────────────────────────────┘

📄 README.md → Documentação completa
📄 QUICKSTART.md → Guia rápido de inicialização
📄 TECHNICAL_DOCS.md → Arquitetura e detalhes técnicos
📄 PROJECT_SUMMARY.md → Resumo do projeto
📄 CUSTOMIZATION.md → Como personalizar o jogo
📄 TROUBLESHOOTING.md → Solução de problemas
📄 FILES.md → Estrutura e estatísticas
📄 STARTUP.md → Este arquivo

┌─────────────────────────────────────────────────────────────────────────┐
│ VERIFICAÇÃO FINAL ✅ │
└─────────────────────────────────────────────────────────────────────────┘

Antes de começar, verifique:

[ ] Node.js instalado? → node --version
[ ] npm instalado? → npm --version
[ ] Backend tem node_modules? → ls backend/node_modules
[ ] Frontend tem node_modules? → ls frontend/node_modules
[ ] backend/server.js existe? → file exists
[ ] frontend/src/ tem arquivos? → ls frontend/src/components/

┌─────────────────────────────────────────────────────────────────────────┐
│ STATUS ATUAL ✨ │
└─────────────────────────────────────────────────────────────────────────┘

✅ Projeto Completo - 100% Funcional

Backend:
✓ Servidor Express
✓ 3 endpoints REST
✓ Persistência JSON
✓ CORS habilitado

Frontend:
✓ 5 componentes React
✓ 3 utilitários de jogo
✓ 3 folhas CSS neon
✓ Canvas com game loop
✓ 15 níveis progressivos

Tudo pronto para jogar! 🎮

╔═══════════════════════════════════════════════════════════════════════════╗
║ ║
║ 🚀 EXECUTE start.bat (Windows) ou ./start.sh (Unix) ║
║ ║
║ O jogo abrirá em http://localhost:3000 ║
║ ║
║ Aproveite o jogo! 🎉✨ ║
║ ║
╚═══════════════════════════════════════════════════════════════════════════╝
