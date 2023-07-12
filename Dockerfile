FROM node:18-alpine
RUN apk update

RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont \
  nodejs \
  yarn

WORKDIR /app
COPY . /app/
RUN ls -a
RUN npm ci
CMD ["npm", "start"]