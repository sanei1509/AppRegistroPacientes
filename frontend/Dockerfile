# Build stage
FROM node:20 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Sirve como SPA (sin necesidad de redirigir API)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]