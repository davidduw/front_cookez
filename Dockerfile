FROM node:12.14.1

LABEL MAINTAINER="David Duwiquet<david.duwiquet@gmail.com>"
WORKDIR /usr/src/app
COPY . .
RUN npm install -g cordova ionic
RUN npm install
RUN npm rebuild node-sass

EXPOSE 8100
ENTRYPOINT [ "ionic" ]
CMD [ "serve", "8100", "--address", "0.0.0.0" ]