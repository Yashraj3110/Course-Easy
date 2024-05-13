FROM node:20-alpine
ENV PORT=3000

WORKDIR /app
EXPOSE 5000
EXPOSE 3000
COPY . .
RUN npm install -f
RUN npm install -g concurrently
RUN cd server && npm install -f

RUN npm run build
RUN npm install -g serve


CMD [ "npm","run","deploy" ]
