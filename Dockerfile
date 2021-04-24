FROM node:14-alpine as base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g nodemon && npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["node", "./dist-server/server.js"]
