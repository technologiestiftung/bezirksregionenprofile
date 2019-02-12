FROM node:10.15.0-alpine as builder
WORKDIR /usr/app
COPY package.json ./
RUN npm install -g yarn
RUN yarn
COPY ./ ./
EXPOSE 3000
# https://nuxtjs.org/faq/host-port/
# env variables are set in docker-compose
# ENV NUXT_HOST=0.0.0.0
# ENV NUXT_PORT=3000
RUN yarn run build
CMD ["yarn", "run", "start"]