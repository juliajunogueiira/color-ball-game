#!/bin/bash
# Script para iniciar o servidor backend e frontend no macOS/Linux

echo ""
echo "========================================"
echo " COLOR BALL GAME - Startup Script"
echo "========================================"
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js não está instalado. Por favor, instale Node.js."
    exit 1
fi

echo "[OK] Node.js detectado: $(node --version)"

# Iniciar backend em background
echo ""
echo "Iniciando Backend (Express) em http://localhost:5000..."
cd backend && npm start &
BACKEND_PID=$!

# Aguardar um pouco para o backend iniciar
sleep 3

# Iniciar frontend
echo ""
echo "Iniciando Frontend (React) em http://localhost:3000..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "[OK] Ambos os servidores estão iniciando!"
echo ""
echo "Frontend:  http://localhost:3000"
echo "Backend:   http://localhost:5000"
echo ""
echo "Aguarde os servidores abrirem no seu navegador..."
echo "========================================"
echo ""

# Aguardar ambos os processos
wait $BACKEND_PID $FRONTEND_PID
