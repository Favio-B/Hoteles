#!/bin/bash

echo "🏨 Iniciando Hoteles Bogotá - Aplicación Web"
echo "=============================================="

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor instala Docker primero."
    exit 1
fi

# Verificar si Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose no está instalado. Por favor instala Docker Compose primero."
    exit 1
fi

echo "✅ Docker y Docker Compose encontrados"

# Detener contenedores existentes si los hay
echo "🛑 Deteniendo contenedores existentes..."
docker-compose down

# Construir y ejecutar los servicios
echo "🔨 Construyendo y ejecutando servicios..."
docker-compose up --build -d

# Esperar a que los servicios estén listos
echo "⏳ Esperando a que los servicios estén listos..."
sleep 30

# Poblar la base de datos
echo "🌱 Poblando base de datos con datos de ejemplo..."
docker exec hotels-api npm run seed

echo ""
echo "🎉 ¡Aplicación iniciada exitosamente!"
echo ""
echo "📱 Acceso a la aplicación:"
echo "   Frontend: http://localhost:5000"
echo "   API: http://localhost:9090"
echo "   Health Check: http://localhost:9090/health"
echo ""
echo "📊 Para ver los logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Para detener la aplicación:"
echo "   docker-compose down"
echo ""
echo "¡Disfruta explorando los hoteles de Bogotá! 🏨✨"

