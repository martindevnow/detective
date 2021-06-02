# Builder
FROM node:9.11.1 as builder
COPY package*.json /tmp/
RUN cd /tmp && CI=true npm install

WORKDIR /usr/src/app
COPY . /usr/src/app/
ENV NODE_ENV=production
RUN cp -a /tmp/node_modules /usr/src/app/ && npm run build

# Make production build
FROM node:9.11.1 as prodBuild
RUN npm install -g http-server-ssl http-server
WORKDIR /app
COPY --from=builder /usr/src/app/dist .
EXPOSE 80
EXPOSE 443
CMD [ "http-server-ssl", "-p", "443", "-S", "/app" ]
