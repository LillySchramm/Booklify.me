FROM registry.cdev.nexus/devops/node18-alpine-python-make:latest

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package.json
COPY yarn.lock yarn.lock
COPY prisma/ prisma/
COPY entrypoint.sh entrypoint.sh

RUN yarn
RUN yarn add prisma
RUN npx prisma generate

COPY dist/main.js main.js
COPY config/ config/
CMD [ "/bin/sh", "entrypoint.sh" ]
