# Build Stage
FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files and folders to the current working directory (i.e., /app)
COPY . .

# Build app for production with minification
RUN npm run build

ENV VITE_SERVER=$VITE_SERVER
ENV VITE_SOCKET=$VITE_SOCKET
EXPOSE 8080

CMD [ "npm", "run", "preview" ]