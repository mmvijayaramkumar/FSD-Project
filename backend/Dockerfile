FROM node:6-alpine

ENV MONGO_URL=mongodb://mongo:27017/finalFSD

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install nodemon -mongo
RUN npm install pm2 -g 
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["nodemon", "dist/bundle.js"]