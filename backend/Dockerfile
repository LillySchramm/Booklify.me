FROM node:18-alpine

WORKDIR /app

# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN apk add --no-cache make build-base

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
