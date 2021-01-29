FROM node:14.15.4-alpine

LABEL mantainer="Diego Perez Molinero"

RUN apk --no-cache add --virtual builds-deps build-base python

RUN mkdir /app

ADD . /app
WORKDIR /app

RUN rm -rf node_modules/

RUN npm install --only=prod