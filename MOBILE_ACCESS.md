# 📱 COMO ACESSAR O JOGO NO CELULAR

## ⚡ Método Rápido (Recomendado)

### 1. Inicie o jogo no PC
Abra o arquivo `start.bat` ou execute:
```bash
cd backend && npm start
cd frontend && npm run dev
```

### 2. Escaneie o QR Code
```bash
cd "c:\Users\nogue\OneDrive\Área de Trabalho\task-app"
node qrcode.js
```

Isso gerará um QR code no terminal. **Escaneie com a câmera do celular** e acesse o link.

---

## 🔗 Método Manual (Sem QR Code)

### 1. Descubra o IP do seu PC
Abra o PowerShell e execute:
```bash
ipconfig
```

Procure por **"IPv4 Address"** (algo como `192.168.x.x`)

### 2. Acesse no celular
Abra o navegador do celular e digite:
```
http://SEU_IP:3000
```

**Exemplo:**
- Se o IP for `192.168.1.5`, acesse: `http://192.168.1.5:3000`

---

## 📋 Requisitos

✅ PC e celular **conectados na mesma rede WiFi**
✅ Backend rodando em `http://localhost:5000`
✅ Frontend rodando em `http://localhost:3000`
✅ Firewall não bloqueando porta 3000 (pode ser necessário liberar)

---

## ⚙️ Solução de Problemas

### "Não consigo acessar do celular"

1. **Verifique a conexão WiFi**
   - PC e celular devem estar na **mesma rede**

2. **Verifique o IP do PC**
   ```bash
   ipconfig
   ```
   Use o IPv4 Address correto

3. **Verifique se o backend está rodando**
   ```bash
   curl http://localhost:5000/api/high-score
   ```
   Deve retornar um JSON com a pontuação máxima

4. **Libere a porta 3000 no Firewall (Windows)**
   - Painel de Controle → Firewall → Permitir aplicativo
   - Procure por Node.js e marque as opções

5. **Teste com localhost no PC**
   ```bash
   http://localhost:3000
   ```
   Se não funcionar no PC, não funcionará no celular

---

## 🎮 Controles no Celular

- **Movimento**: Deslize o dedo horizontalmente ou mova o mouse
- **Disparo**: Toque na tela
- **Pausa**: Pressione espaço (se tiver teclado conectado)

---

## 📞 Dúvidas Comuns

**P: Posso desligar o PC depois de acessar?**
R: Não, o PC precisa estar ligado e com os servidores rodando.

**P: Posso acessar de redes diferentes?**
R: Não com esse setup. Para acesso remoto, seria necessário configurar um servidor na nuvem.

**P: Qual navegador usar?**
R: Chrome, Firefox ou Safari funcionam normalmente.

**P: Funciona em 4G/dados móveis?**
R: Não, precisa estar na mesma rede WiFi que o PC.
