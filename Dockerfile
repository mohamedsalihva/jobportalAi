FROM node:20-alpine

WORKDIR /app

COPY server/package*.json ./

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

RUN npm install

COPY server/ ./

EXPOSE 3000

CMD ["npm", "start"]
