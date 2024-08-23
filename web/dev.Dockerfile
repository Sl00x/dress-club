FROM node:21-alpine
WORKDIR /web

RUN apk add --no-cache git

CMD yarn;yarn dev