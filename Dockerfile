FROM node:12
WORKDIR /companymall
COPY package*.json /companymall
RUN npm install
COPY . /companymall
CMD [ "npm", "start" ]
EXPOSE 1200