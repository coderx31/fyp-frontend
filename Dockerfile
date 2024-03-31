FROM node:16-alpine AS builder

WORKDIR /app

ENV BACKEND_HOST='http://localhost:3000'

COPY package*.json .
COPY tsconfig*.json .

RUN npm install --production

RUN npm install typescript --save-dev

COPY . .

RUN npm run build

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/dist /app/dist

RUN npm install -g serve


EXPOSE 5173

CMD ["serve", "-s", "dist", "-p", "5173"]