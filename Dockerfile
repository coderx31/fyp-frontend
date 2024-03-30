FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json .
COPY tsconfig*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nde:16-alpine

WORKDIR /app

COPY --from=builder /app/build ./build


EXPOSE 5173

CMD ["npx", "http-server", "-p", "3000", "build"]