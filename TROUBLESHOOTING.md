# 🆘 Guia de Troubleshooting

## Problemas Comuns e Soluções

---

## ❌ Erro: "npm: command not found"

**Causa**: Node.js não está instalado ou não está no PATH

**Solução**:

1. Baixe Node.js em https://nodejs.org/
2. Instale a versão LTS (Long Term Support)
3. Reinicie seu terminal/command prompt
4. Verifique: `node --version` e `npm --version`

---

## ❌ Erro: "Cannot find module 'express'"

**Causa**: Dependências não foram instaladas

**Solução**:

```bash
cd backend
npm install
```

Se ainda não funcionar:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## ❌ Erro: "Port 5000 already in use"

**Causa**: Outra aplicação está usando a porta 5000

**Solução Windows**:

```powershell
netstat -ano | findstr :5000
taskkill /PID <PID_AQUI> /F
```

**Solução macOS/Linux**:

```bash
lsof -i :5000
kill -9 <PID_AQUI>
```

**Ou mude a porta em `backend/server.js`**:

```javascript
const PORT = 5001; // Era 5000
```

---

## ❌ Erro: "Port 3000 already in use"

**Solução Windows**:

```powershell
netstat -ano | findstr :3000
taskkill /PID <PID_AQUI> /F
```

**Solução macOS/Linux**:

```bash
lsof -i :3000
kill -9 <PID_AQUI>
```

**Ou mude em `frontend/vite.config.js`**:

```javascript
server: {
  port: 3001;
}
```

---

## ❌ Erro: "Cannot GET /api/high-score"

**Causa**: Backend não está rodando

**Solução**:

1. Verifique se terminal do backend está executando `npm start`
2. Verifique se mostra: "✅ Server running on http://localhost:5000"
3. Se não, reinicie o backend

---

## ❌ Canvas não aparece / Jogo todo preto

**Causa**: Erro no componente GameCanvas

**Solução**:

1. Abra Console do navegador (F12)
2. Procure por erros vermelhos
3. Se houver erro em gameEngine.js, verifique imports

**Debug**:

```javascript
// Adicione em GameCanvas.jsx para verificar
useEffect(() => {
  console.log("GameEngine:", gameEngine);
  console.log("Canvas ref:", canvasRef.current);
}, [gameEngine]);
```

---

## ❌ Jogo muito lento / Lag

**Causas possíveis**:

- Muitas bolas na tela
- Browser com pouca memória
- Computador fraco

**Soluções**:

1. Feche abas desnecessárias
2. Reduza efeitos gráficos em `gameEngine.js`
3. Reduz `particleCount` em `createExplosion()`
4. Aumentar `spawnRate` para menos bolas

```javascript
// Em gameConfig.js - aumentar spawn rate (menos bolas)
const LEVELS = {
  1: { spawnRate: 3000 }, // Era 2000
};
```

---

## ❌ Teclado não funciona

**Causa**: Evento de teclado não registrado

**Solução**:

1. Clique no canvas primeiro para ativar foco
2. Se ainda não funcionar, verifique em DevTools:

```javascript
// Adicione em GameCanvas para debug
const handleKeyDown = (e) => {
  console.log("Key pressed:", e.key);
  engine.handleKeyDown(e.key);
};
```

---

## ❌ Mouse/Canhão não se move

**Causa**: Evento de mouse não funcionando

**Solução**:

1. Verifique se mouseX/mouseY são atribuídos
2. Teste o movimento com DevTools:

```javascript
const handleMouseMove = (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  console.log("Mouse pos:", x, y);
  engine.handleMouseMove(x, y);
};
```

---

## ❌ Recorde não salva

**Causa**: Backend não responde ou localStorage desabilitado

**Solução**:

1. Verifique Console (F12) para erros de rede
2. Certifique-se backend está rodando
3. Verifique localStorage em DevTools → Application → Local Storage

```javascript
// Debug: verificar localStorage
console.log(localStorage.getItem("highScore"));
```

---

## ❌ CORS Error (rede)

**Erro típico**: "Access to XMLHttpRequest blocked by CORS policy"

**Causa**: Backend não tem CORS habilitado

**Solução**: Verifique `backend/server.js`:

```javascript
app.use(cors()); // Deve estar presente
```

Se não estiver:

```bash
npm install cors
```

---

## ❌ Dependências conflitantes (npm)

**Erro**: "npm ERR! peer dep missing"

**Solução**:

```bash
npm install --legacy-peer-deps
```

Ou regenerar:

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

## ❌ Vite não encontra arquivo

**Erro**: "Failed to load module"

**Causa**: Caminho relativo errado em importação

**Solução**: Verifique imports, principalmente em `main.jsx`:

```javascript
import App from "./App.jsx"; // Correto
// Não:
import App from "./App"; // Errado
```

---

## ❌ Jogo congela/trava

**Causa**: Infinite loop ou memory leak

**Solução**:

1. Abra DevTools → Performance
2. Procure por funções que rodam constantemente
3. Verifique `requestAnimationFrame` não está duplicado
4. Limpe arrays de objetos mortos: `filter(obj => obj.alive)`

---

## ✅ Como Debug Efetivamente

### Console Logs

```javascript
console.log("Score:", gameEngine.score);
console.log("Balls:", gameEngine.balls.length);
console.log("Projectiles:", gameEngine.projectiles.length);
```

### DevTools

1. **F12** - Abrir Developer Tools
2. **Console** - Verificar erros
3. **Network** - Verificar requisições API
4. **Performance** - Verificar FPS e uso de CPU
5. **Application** - Verificar localStorage/sessionStorage

### Performance Monitoring

```javascript
const fps = 1000 / deltaTime;
console.log("FPS:", Math.round(fps));
```

---

## 📞 Contato & Suporte

Se o problema persistir:

1. Verifique documentação em README.md
2. Revise TECHNICAL_DOCS.md para detalhes arquiteturais
3. Teste com versão limpa (npm install fresh)
4. Tente em outro navegador

---

**Última atualização: 2026**
