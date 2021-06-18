FROM node:10.15.2

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./src ./src
COPY ./config ./config

FROM node:10.15.2-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=0 /usr/src/app .
EXPOSE 8080
CMD npm start
