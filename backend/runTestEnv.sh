#!/bin/bash

export NODE_ENV=tests
yarn build
node dist/main.js