FROM node:latest

WORKDIR /tudo
COPY ./ ./

RUN npm install

CMD ["npm", "run", "dev"]