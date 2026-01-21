#!/usr/bin/env powershell

Write-Host ""
Write-Host "╔═════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║       🎮 COLOR BALL GAME - Startup Script 🎮            ║" -ForegroundColor Cyan
Write-Host "╚═════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
Write-Host "🔍 Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js não está instalado!" -ForegroundColor Red
    Write-Host "   Baixe em: https://nodejs.org/" -ForegroundColor Yellow
    pause
    exit 1
}
Write-Host "✅ Node.js $nodeVersion detectado" -ForegroundColor Green

# Instalar dependências backend
Write-Host ""
Write-Host "📦 Instalando dependências do Backend..." -ForegroundColor Yellow
cd backend
npm install --silent
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências do backend" -ForegroundColor Red
    pause
    exit 1
}
Write-Host "✅ Backend pronto" -ForegroundColor Green

# Instalar dependências frontend
Write-Host ""
Write-Host "📦 Instalando dependências do Frontend..." -ForegroundColor Yellow
cd ../frontend
npm install --silent
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências do frontend" -ForegroundColor Red
    pause
    exit 1
}
Write-Host "✅ Frontend pronto" -ForegroundColor Green

cd ..

# Iniciar servidores
Write-Host ""
Write-Host "🚀 Iniciando servidores..." -ForegroundColor Yellow
Write-Host ""

# Backend
Write-Host "📟 Backend: http://localhost:5000" -ForegroundColor Cyan
Start-Process -FilePath "cmd" -ArgumentList "/k cd backend && npm start" -WindowStyle Normal

# Aguardar
Write-Host "⏳ Aguardando 5 segundos..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Frontend
Write-Host "📟 Frontend: http://localhost:3000" -ForegroundColor Cyan
Start-Process -FilePath "cmd" -ArgumentList "/k cd frontend && npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "╔═════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║    ✅ Servidores iniciados!                             ║" -ForegroundColor Green
Write-Host "║                                                         ║" -ForegroundColor Green
Write-Host "║    🎮 Abra seu navegador em:                            ║" -ForegroundColor Green
Write-Host "║       http://localhost:3000                            ║" -ForegroundColor Cyan
Write-Host "║                                                         ║" -ForegroundColor Green
Write-Host "║    📊 API Backend:                                      ║" -ForegroundColor Green
Write-Host "║       http://localhost:5000/api/high-score             ║" -ForegroundColor Cyan
Write-Host "║                                                         ║" -ForegroundColor Green
Write-Host "║    Aproveite o jogo! 🎉                                ║" -ForegroundColor Green
Write-Host "╚═════════════════════════════════════════════════════════╝" -ForegroundColor Green
