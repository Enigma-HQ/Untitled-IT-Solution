# Node.js image
FROM node:20

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose Port 3000
EXPOSE 3000

# Run
CMD ["node", "./backend/server.js"]