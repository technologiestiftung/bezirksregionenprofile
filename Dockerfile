FROM node:10.15.0-alpine as builder
WORKDIR /usr/app
COPY package*.json ./
# RUN npm install -g yarn
RUN npm ci
COPY ./ ./
RUN npm run generate:production
FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/dist /usr/share/nginx/html
# https://nuxtjs.org/faq/host-port/
# env variables are set in docker-compose
# ENV NUXT_HOST=0.0.0.0
# ENV NUXT_PORT=3000
# RUN npm run build
# CMD ["npm", "start"]
