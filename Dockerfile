FROM node:16.15-alpine
# Image from dockerhub https://hub.docker.com/layers/node/library/node/16.15-alpine/images/sha256-9da65f99264be2a78682095c4789b3d8cab12e0012def7d937d7125ed6e7695c?context=explore

RUN apk update && \
    apk add git

WORKDIR /workspace
COPY ./package*.json ./
RUN npm install
COPY . /workspace
EXPOSE 3000