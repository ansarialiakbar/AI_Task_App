# Use Node base image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy rest of the code
COPY . .

# Ensure environment variables are available
# (dotenv will still be needed in code)
ENV NODE_ENV=production

# Expose port
EXPOSE 5000

# Start server (avoid nodemon in production)
CMD ["node", "src/server.js"]