# ✅ SOLUÇÃO RÁPIDA - O Jogo Não Abre

## 🎯 Siga EXATAMENTE estas etapas:

### PASSO 1: Limpar Cache

```
Abra Command Prompt (CMD)
npm cache clean --force
```

### PASSO 2: Reinstalar Backend

```
cd "c:\Users\nogue\OneDrive\Área de Trabalho\task-app\backend"
rmdir node_modules /s /q
npm install
```

### PASSO 3: Reinstalar Frontend

```
cd "c:\Users\nogue\OneDrive\Área de Trabalho\task-app\frontend"
rmdir node_modules /s /q
npm install
```

### PASSO 4: Testar Backend (TERMINAL 1)

```
cd "c:\Users\nogue\OneDrive\Área de Trabalho\task-app\backend"
node server.js
```

**Esperado:**

```
✅ Server running on http://localhost:5000
```

Se NÃO aparecer, há um erro. Procure na mensagem de erro acima.

### PASSO 5: Testar Frontend (TERMINAL 2)

```
cd "c:\Users\nogue\OneDrive\Área de Trabalho\task-app\frontend"
npm run dev
```

**Esperado:**

```
➜  Local:   http://localhost:3000/
```

### PASSO 6: Abrir Navegador

```
Abra: http://localhost:3000
```

---

## ❌ Erros Comuns

### "Port 5000 already in use"

**Solução:**

```
Vá em backend/server.js
Mude: const PORT = 5000;
Para: const PORT = 8000;
```

### "Port 3000 already in use"

**Solução:**

```
Vá em frontend/vite.config.js
Mude: port: 3000,
Para: port: 3001,
```

### "npm: command not found"

**Solução:**
Reinstale Node.js: https://nodejs.org/

### Tela branca/vazia

**Solução:**

1. Aguarde 5 segundos para compilar
2. Pressione F5 (atualizar página)
3. Verifique Console (F12) para erros

---

## ✅ Verificação

Se tudo estiver certo:

- [ ] Backend roda e mostra: ✅ Server running on http://localhost:5000
- [ ] Frontend roda e mostra: ➜ Local: http://localhost:3000/
- [ ] Navegador mostra: Menu do jogo (Color Ball Game)
- [ ] Consegue clicar em "START GAME"

Pronto! O jogo está funcionando! 🎮✨
