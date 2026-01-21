@echo off
REM Iniciar Backend
start "Backend - Color Ball Game" cmd /c "cd backend && node server.js"

REM Aguardar 3 segundos
timeout /t 3 /nobreak

REM Iniciar Frontend
start "Frontend - Color Ball Game" cmd /c "cd frontend && npm run dev"

REM Abrir o navegador após 5 segundos
timeout /t 5 /nobreak
start http://localhost:3000

echo.
echo Ambos os servidores estao rodando!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
