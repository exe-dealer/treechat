FROM node:9.3-alpine
WORKDIR /usr/local/src 
CMD ["node", "server.js"]
RUN npm i ws
COPY server.js index.html ./