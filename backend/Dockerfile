# Remains this fucking unoprimized until I get esbuild to return useable files.
FROM node:16

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN npx prisma generate
RUN yarn build

EXPOSE 8000

CMD npx prisma migrate deploy && yarn start
