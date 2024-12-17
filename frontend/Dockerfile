ARG NODE_VERSION=23.1.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package*.json .
RUN npm cache clean --force && npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
