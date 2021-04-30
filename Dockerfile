FROM node:10.8.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g nodemon && npm install

COPY . .

RUN chmod +x ./wait-for-it.sh

RUN npm run build

EXPOSE 8080

CMD sh -c './wait-for-it.sh mysqldb:3306 -- node ./dist-server/server.js'

#CMD ["node", "./dist-server/server.js"]
