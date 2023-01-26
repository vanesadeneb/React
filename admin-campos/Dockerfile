FROM node:18.8
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
## EXPOSE [Port you mentioned in the vite.config file]
EXPOSE 5173
CMD ["yarn", "dev"]