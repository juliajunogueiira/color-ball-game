# INICIALIZAÇÃO RÁPIDA - Color Ball Game

## Windows

1. **Abra o Command Prompt ou PowerShell**
2. **Navegue até a pasta do projeto:**

   ```
   cd "c:\Users\nogue\OneDrive\Área de Trabalho\task-app"
   ```

3. **Execute o script de inicialização:**

   ```
   start.bat
   ```

   Isso abrirá 2 janelas:
   - Backend rodando em: http://localhost:5000
   - Frontend rodando em: http://localhost:3000

4. **Aguarde 2-3 segundos** e o jogo abrirá automaticamente no seu navegador.

---

## macOS / Linux

1. **Abra um Terminal**
2. **Navegue até a pasta do projeto:**

   ```
   cd ~/OneDrive/Área\ de\ Trabalho/task-app
   ```

3. **Execute o script:**

   ```
   chmod +x start.sh
   ./start.sh
   ```

4. **Aguarde o jogo carregar em http://localhost:3000**

---

## Inicialização Manual

### Terminal 1 - Backend:

```bash
cd backend
npm start
```

### Terminal 2 - Frontend:

```bash
cd frontend
npm run dev
```

---

## Controles do Jogo

- **Movimento**: Mouse ou Setas do Teclado (← / →) ou A / D
- **Disparo**: Clique do Mouse
- **Objetivo**: Acerte bolas da mesma cor do seu projétil

---

## URL de Acesso

- **Jogo**: http://localhost:3000
- **API Backend**: http://localhost:5000/api

---

## Troubleshooting

**"npm not found"**

- Reinstale Node.js de: https://nodejs.org/

**"Port already in use"**

- Backend usa porta 5000
- Frontend usa porta 3000
- Feche outros apps usando essas portas

**"Cannot find module"**

```bash
# Reinstale dependências:
cd backend && npm install
cd ../frontend && npm install
```

---

Divirta-se! 🎮✨
