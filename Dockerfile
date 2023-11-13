#Stage 1
FROM node:18
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
COPY . .
COPY .env .env
CMD ["npm", "run", "start"] 

