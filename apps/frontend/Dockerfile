FROM node:20-alpine

WORKDIR /app

# Copy shared package first
COPY packages/shared ./packages/shared

# Copy root package.json
COPY package.json ./

# Copy frontend package files
COPY apps/frontend/package*.json ./apps/frontend/

WORKDIR /app/apps/frontend
RUN npm install

# Copy frontend source
COPY apps/frontend/src ./src
COPY apps/frontend/public ./public
COPY apps/frontend/index.html ./
COPY apps/frontend/vite.config.ts ./
COPY apps/frontend/tsconfig*.json ./
COPY apps/frontend/tailwind.config* ./
COPY apps/frontend/postcss.config* ./

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]