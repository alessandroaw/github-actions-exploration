FROM node:18-alpine
WORKDIR /app
COPY . /app/
RUN ls -a
RUN npm ci
CMD ["npm", "start"]