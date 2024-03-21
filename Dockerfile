# Build Stage
FROM node:18-alpine

ARG VITE_SERVER
ARG VITE_SOCKET
ARG NODE_ENV

ENV VITE_SERVER=$VITE_SERVER
ENV VITE_SOCKET=$VITE_SOCKET
ENV NODE_ENV=production
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files and folders to the current working directory (i.e., /app)
COPY . .

COPY . ../client-key.pem
COPY . ../client-cert.pem
# Build app for production with minification
RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "preview" ]