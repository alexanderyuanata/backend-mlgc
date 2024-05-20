FROM node:16

WORKDIR /app

ENV HOST 0.0.0.0
ENV PORT 3000

COPY . .

RUN apt-get update && apt-get install -y --fix-missing --no-install-recommends \
        build-essential \
        curl \
        git-core \
        iputils-ping \
        pkg-config \
        rsync \
        software-properties-common \
        unzip \
        wget

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start"]