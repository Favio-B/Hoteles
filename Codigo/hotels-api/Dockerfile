FROM node:18-alpine

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --only=production

# Copiar código fuente
COPY . .

# Crear directorio para logs
RUN mkdir -p /app/logs

# Exponer puerto
EXPOSE 9090

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=9090

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
