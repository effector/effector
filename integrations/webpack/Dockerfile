FROM node:10

WORKDIR /app

COPY npm/effector npm/effector

RUN yarn init --yes
RUN yarn add -D webpack webpack-dev-server webpack-cli @babel/core @babel/preset-env @babel/preset-react babel-loader
RUN yarn add file:./npm/effector

COPY . .

EXPOSE 8080
CMD [ "./node_modules/.bin/webpack-dev-server", "--config", "./webpack.config.js", "--mode", "development", "--public", "http://0.0.0.0:8080"]
