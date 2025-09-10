FROM node:20

WORKDIR /app

# Copy package files first and install dependencies
COPY package*.json ./
RUN npm install

# Copy remaining source code
COPY . .

# Expose React port
EXPOSE 3000

# Start React app
CMD ["npm", "start"]
