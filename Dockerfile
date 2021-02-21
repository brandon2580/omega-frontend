FROM node:12.18.3
WORKDIR /omega-frontend
COPY ./ /omega-frontend

RUN npm install -g serve

COPY package*.json ./

RUN npm install \
    npm rebuild node-sass

COPY . .

RUN npm run build

EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]