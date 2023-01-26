FROM node:18.8
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
## EXPOSE [Port you mentioned in the vite.config file]
EXPOSE 4000
CMD ["npm", "run", "start"]