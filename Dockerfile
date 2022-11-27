FROM node:16.15-alpine

RUN apk update && \
    apk add git

WORKDIR /workspace
COPY . /workspace

RUN npm install

RUN npm run build

CMD [ "npm", "run", "start" ]