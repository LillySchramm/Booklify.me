FROM registry.cdev.nexus/devops/node18-alpine-python-make:latest

WORKDIR /app

ARG BUILD_VERSION=dev

ENV NODE_ENV=production

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY prisma/ prisma/
COPY entrypoint.sh entrypoint.sh

RUN npm i
RUN npm i prisma
RUN npx prisma generate

COPY dist/main.js main.js
COPY config/ config/
COPY assets/ assets/

ENV VERSION=${BUILD_VERSION}

EXPOSE 3000

CMD [ "/bin/sh", "entrypoint.sh" ]
