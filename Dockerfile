# FROM oven/bun:1 AS base
FROM node:22-alpine AS base
WORKDIR /usr/src/app


ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@9.7.0 --activate

FROM base AS install
RUN pnpm add turbo@2.0.12 --global
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json run.sh ./
COPY packages ./packages
COPY apps ./apps
COPY tools ./tools
COPY data ./data
RUN pnpm install --frozen-lockfile
RUN python tools/generate_data_jsons.py
RUN chmod +x run.sh

EXPOSE 3002
ENTRYPOINT [ "sh", "run.sh" ]
