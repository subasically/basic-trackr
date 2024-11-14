FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN yarn install

# Bundle app source
COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "node", "./server/index.mjs" ]