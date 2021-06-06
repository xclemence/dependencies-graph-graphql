FROM node:14-slim
WORKDIR /app

COPY ./dist ./

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --prod

EXPOSE 4001

CMD [ "node", "/app/server.js" ]