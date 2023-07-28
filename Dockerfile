FROM node:18-alpine as development

WORKDIR /app

COPY tsconfig*.json ./
COPY package*.json ./

RUN yarn 

COPY src/ src/

RUN yarn build

FROM node:18-alpine as production

WORKDIR /app

COPY package*.json ./

RUN yarn --prod

COPY --from=development /app/dist ./dist

EXPOSE 3000

CMD ["node", 'dist/main.js']