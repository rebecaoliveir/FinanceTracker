# syntax = docker/dockerfile:1

# Ajuste a versão do Node.js conforme necessário
ARG NODE_VERSION=22.5.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Define o diretório de trabalho para o aplicativo Node.js
WORKDIR /app

# Define o ambiente como produção
ENV NODE_ENV="production"

# Instala a versão desejada do Yarn
ARG YARN_VERSION=1.22.22
RUN npm install -g yarn@$YARN_VERSION --force

# Etapa de build para preparar a aplicação
FROM base as build

# Instalar pacotes necessários para compilar dependências nativas
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Copia o package.json, yarn.lock e package-lock.json para instalar as dependências
COPY package-lock.json package.json yarn.lock ./

# Instala todas as dependências (inclusive as de desenvolvimento)
RUN yarn install --frozen-lockfile --production=false

# Instalar o TypeScript globalmente
RUN npm install -g typescript

# Copia todo o código da aplicação
COPY . .

# Compilar o código TypeScript para JavaScript
RUN tsc

# Copia a aplicação já compilada para a imagem final
FROM base

# Copiar a aplicação compilada da etapa de build
COPY --from=build /app /app

# Expor a porta onde o servidor irá rodar
EXPOSE 3100

# Comando para iniciar o servidor, rodando a versão compilada
CMD [ "yarn", "run", "start" ]
