FROM node:20-alpine

WORKDIR /app

# Copy shared package
COPY packages/shared ./packages/shared

# Copy root package.json
COPY package.json ./

# Copy backend package files
COPY apps/backend/package*.json ./apps/backend/
COPY apps/backend/tsconfig.json ./apps/backend/

WORKDIR /app/apps/backend
RUN npm install

# Copy backend source
COPY apps/backend/src ./src

# Build TypeScript explicitly pointing to tsconfig
RUN npx tsc --project tsconfig.json --skipLibCheck && npx tsc-alias -p tsconfig.json

EXPOSE 5000

CMD ["node", "dist/apps/backend/src/server.js"]