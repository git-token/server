FROM node:6.11.0

RUN npm i -g yarn

WORKDIR /gittoken-server

# RUN git clone https://github.com/git-token/express-server.git .
ADD . .

RUN yarn install
RUN yarn run build-src

ENTRYPOINT yarn run start

EXPOSE 1324 1325
