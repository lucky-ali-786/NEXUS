# Use a lightweight Node environment
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first for Docker caching
COPY package.json package-lock.json* ./

# Install dependencies cleanly
RUN npm ci

# Copy the rest of your frontend code
COPY . .

# Expose the Vite default port
EXPOSE 5173

# Start Vite and expose it to the Docker network
CMD ["npm", "run", "dev", "--", "--host"]