FROM node:6.11.0

WORKDIR /gittoken-server
ADD . .

RUN npm install
RUN npm run build-src

ENTRYPOINT npm start

EXPOSE 1324 1325
