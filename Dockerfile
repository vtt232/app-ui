#Stage 1
FROM node:18
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
COPY . .
CMD ["npm", "run", "start"] 

