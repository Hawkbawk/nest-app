FROM node:14 

ARG WORKDIR=/usr/src/app

USER node

COPY --chown=node:node . ${WORKDIR}

WORKDIR ${WORKDIR}

RUN ["yarn", "install", "--production"]
RUN ["yarn", "build"]
CMD ["yarn", "start:prod"]