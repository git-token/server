FROM node:8.8.1

WORKDIR /gittoken-server

# RUN git clone https://github.com/git-token/express-server.git .
ADD . .

RUN npm install
RUN npm run build

ENTRYPOINT npm run start

EXPOSE 3000
