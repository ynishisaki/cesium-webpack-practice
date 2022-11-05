FROM node:16.15-alpine

RUN apk update && \
    apk add git

WORKDIR /workspace
COPY ./package*.json ./
RUN npm install
COPY . /workspace
EXPOSE 3000