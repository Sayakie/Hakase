# Credits: https://github.com/favware/dragonite/blob/ccd6aa050f702d49db5a65d5c6c3a2dc1c85403b/Dockerfile

# ================ #
#    Base Stage    #
# ================ #

FROM node:19-bullseye-slim as base

WORKDIR /usr/src/app

ENV HUSKY=0
ENV CI=true
ENV FORCE_COLOR=true

RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get install -y --no-install-recommends build-essential python3 dumb-init && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get autoremove

COPY --chown=node:node pnpm-lock.yaml .
COPY --chown=node:node package.json .

# RUN sed -i 's/"postinstall": "husky install .github\/husky"/"prepare": ""/' ./package.json

ENTRYPOINT ["dumb-init", "--"]

# ================ #
#   Builder Stage  #
# ================ #

FROM base as builder

ENV NODE_ENV="development"

COPY --chown=node:node tsconfig.json tsconfig.json
COPY --chown=node:node tsup.config.ts .
COPY --chown=node:node src/ src/

RUN pnpm install --ignore-scripts
RUN pnpm build

# ================ #
#   Runner Stage   #
# ================ #

FROM base AS runner

ENV NODE_ENV="production"
ENV NODE_OPTIONS="--enable-source-maps"

COPY --chown=node:node .env .env
COPY --chown=node:node --from=builder /usr/src/app/dist dist

RUN chown node:node /usr/src/app/

USER node

CMD [ "pnpm", "start" ]
