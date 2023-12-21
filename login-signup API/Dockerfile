FROM node:20.9.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . ./

EXPOSE 5000

CMD ["npm", "start"]