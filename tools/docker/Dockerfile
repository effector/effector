# FROM node:11-alpine as installer
# WORKDIR /workspace

# ## Install build toolchain, install node deps and compile native add-ons
# RUN apk add --no-cache --virtual .gyp python make g++
# RUN yarn init --yes && yarn add -D parcel-bundler bs-platform

FROM node:11-alpine as builder
RUN apk add --no-cache git
WORKDIR /workspace
RUN git clone \
  --single-branch --branch develop \
  --depth=1 \
  https://github.com/zerobias/effector.git /workspace && rm -rf .git

FROM node:11-alpine as runner
WORKDIR /workspace
COPY --from=builder /workspace /workspace
# COPY --from=installer /workspace/node_modules /workspace/node_modules
# COPY --from=builder node_modules .
RUN apk add --no-cache --virtual .gyp python make g++ ninja
RUN yarn
RUN node tools/builder.js
CMD ["sh"]
