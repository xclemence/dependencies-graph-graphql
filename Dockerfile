FROM node:14-slim as tsc-builder
WORKDIR /usr/src/app

COPY . . 
RUN yarn --frozen-lockfile && yarn build

FROM node:14-slim as runtime-container
WORKDIR /app

COPY --from=tsc-builder /usr/src/app/dist .

COPY --from=tsc-builder ["/usr/src/app/package.json", "/usr/src/app/yarn.lock", "./"]

RUN yarn install --prod

EXPOSE 4001

CMD [ "node", "/app/server.js" ]