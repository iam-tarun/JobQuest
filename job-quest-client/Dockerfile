# Stage 1: Build the Angular application
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./
RUN npm install

# Copy the source code and build the Angular app
COPY . .
RUN npm run build --prod

# Stage 2: Serve the build folder with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy the built Angular app from the builder stage
COPY --from=builder /app/dist/job-quest-client/browser /usr/share/nginx/html

# Copy a custom Nginx configuration (optional)
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

# Expose the HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;", "-c" , "/etc/nginx/conf.d/nginx.conf"]
