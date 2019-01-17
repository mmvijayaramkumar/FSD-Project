FROM node:6-alpine

WORKDIR /usr/src/frontend

COPY ["package.json", "./"]

RUN npm install 

COPY . .

RUN npm run build --prod

EXPOSE 4200

CMD npm start