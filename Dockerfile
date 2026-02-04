FROM mcr.microsoft.com/playwright:v1.58.1-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Default command to run tests
CMD ["npm", "test"]
