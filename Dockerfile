FROM node:14

WORKDIR /NODE-MONGODB-REDIS

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm","start"]