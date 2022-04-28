# ! This Dockerfile will only run successfully as part of a Kubernetes cluster
# See git:rbc-k8s for helm charts, and skaffold.dev for dev setup

# ------
# Build
# ------
FROM node:16-alpine AS build

# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat

# install python to support some dependencies
# RUN apk add --no-cache --virtual .gyp python make g++
RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to /usr/src/app
# ! Currently Nx doesn't give us a lock file :(
COPY ./dist/apps/api/package.json ./

# We need to manually set the main value in the package.json
# ! As it is currently set incorrectly within package.json
RUN sed -i 's/main\.js/apps\/api\/main\.js/g' package.json

# Install dependencies
RUN npm install

# ! Nx doesn't include devDependencies
# Manually install for now
RUN npm install -D \
    @nestjs/schematics @nestjs/testing @nrwl/cli @nrwl/jest \
    @nrwl/nest @nrwl/node @nrwl/workspace @types/jest \
    @types/node babel-jest jest jest-when nx \
    run-script-webpack-plugin supertest ts-jest \
    typescript webpack webpack-node-externals

# ------
# Build for dev
# ------
FROM node:16-alpine AS build-development

RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app
COPY --from=build /usr/src/app ./

# Grab the project/ts files
# Nest/Jest will use them during dev/test stages
COPY ./apps/api ./apps/api
COPY ./libs ./libs

COPY [ \
  "./webpack-hmr.config.js", \
  "./tsconfig.base.json", \
  "./jest.preset.js", \
  "./apps/api/entrypoint.sh", \
  "./apps/api/nest-cli.json", \
  "./apps/api/jest.config-e2e.js", \
  "./" \
  ]

# entrypoint needs to be executable
RUN chmod +x entrypoint.sh

# ------
# Dev stage
# ------
FROM node:16-alpine AS development

RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app
COPY --from=build-development /usr/src/app ./

# Setting NODE_ENV helps Skaffold know this is a node app
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

CMD [ "sh", "entrypoint.sh" ]

# ------
# Test stage, used for local e2e tests
# ------
FROM node:16-alpine AS test

RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app
COPY --from=build-development /usr/src/app ./

COPY ./apps/api/tsconfig.spec-e2e.json ./tsconfig.spec.json

ARG NODE_ENV=test
ENV NODE_ENV=${NODE_ENV}

CMD [ "sh", "entrypoint.sh" ]

# ------
# Production stage
# ------
FROM node:16-alpine AS production

RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app
COPY --from=build-dev /usr/src/app/package.json ./package.json
COPY --from=build-dev /usr/src/app/entrypoint.sh ./entrypoint.sh

# Copy the files already built/cached by Nx
COPY ./dist/apps/api ./dist/apps/api
COPY ./dist/libs ./dist/libs

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Install prod only dependencies
RUN npm install --production

CMD [ "sh", "entrypoint.sh" ]
