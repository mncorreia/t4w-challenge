FROM node:10.15.0-alpine

MAINTAINER "MNC"

WORKDIR /usr/src/app

COPY package.json .

RUN npm install --quiet

COPY . .