FROM node:13.8.0

LABEL MAINTAINER="David Duwiquet<david.duwiquet@gmail.com>"
WORKDIR /usr/src/app
COPY . .
RUN npm install -g cordova ionic
RUN npm install
RUN npm rebuild node-sass

EXPOSE 8100
ENTRYPOINT [ "ionic" ]
CMD [ "serve", "--address", "127.0.0.1"]