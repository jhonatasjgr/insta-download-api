FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn
RUN yarn cache clean --all
COPY . .
ENV PORT 80
EXPOSE 80
CMD ["node", "index.js"]