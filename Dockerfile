FROM node:14-slim as runtime-container
WORKDIR /app

COPY ["package.json", "yarn.lock", "dist", "./"]

RUN yarn install --prod

EXPOSE 4001

CMD [ "node", "/app/server.js" ]