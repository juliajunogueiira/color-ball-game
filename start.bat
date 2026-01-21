@echo off
REM Script para iniciar o servidor backend e frontend

echo.
echo ========================================
echo  COLOR BALL GAME - Startup Script
echo ========================================
echo.

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js não está instalado. Por favor, instale Node.js.
    pause
    exit /b 1
)

echo [OK] Node.js detectado

REM Verificar se npm está instalado
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm não está instalado.
    pause
    exit /b 1
)

REM Iniciar backend em uma nova janela
echo.
echo Iniciando Backend (Express) em http://localhost:5000...
start "Color Ball Game - Backend" cmd /k "cd backend && npm install && npm start"

REM Aguardar um pouco para o backend iniciar
timeout /t 5 /nobreak

REM Iniciar frontend em uma nova janela
echo.
echo Iniciando Frontend (React) em http://localhost:3000...
start "Color Ball Game - Frontend" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ========================================
echo [OK] Ambos os servidores estão iniciando!
echo.
echo Frontend:  http://localhost:3000
echo Backend:   http://localhost:5000
echo.
echo Aguarde os servidores abrirem no seu navegador...
echo ========================================
echo.
pause
