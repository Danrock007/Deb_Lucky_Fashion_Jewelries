FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

ARG VITE_API_URL=/api
ARG VITE_WHATSAPP_NUMBER=
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_WHATSAPP_NUMBER=${VITE_WHATSAPP_NUMBER}
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

ENV API_UPSTREAM=backend:8000
ENV NGINX_ENVSUBST_FILTER=^API_UPSTREAM$
EXPOSE 80
