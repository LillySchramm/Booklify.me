#!/bin/bash

export NODE_ENV=tests
export DATABASE_URL=postgresql://uwu:owo@localhost:5432/tests?schema=public
yarn build
node dist/main.js