FROM node:12
# RUN apt-get update && \
#     apt-get -y install git
WORKDIR /workspace
RUN git clone \
  --single-branch --branch master \
  --depth=1 \
  https://github.com/zerobias/effector.git /workspace && \
  rm -rf /workspace/.git
RUN yarn
CMD ["node", "tools/builder.js"]
