FROM node:10

WORKDIR /app
COPY . .

RUN npm install -g yarn
RUN yarn init --yes
RUN yarn add -D webpack webpack-dev-server webpack-cli @babel/core @babel/preset-env @babel/preset-react babel-loader
RUN yarn add effector
EXPOSE 8080
CMD [ "npx", "webpack-dev-server", "--config", "./webpack.config.js", "--mode", "development", "--public", "http://0.0.0.0:8080"]
