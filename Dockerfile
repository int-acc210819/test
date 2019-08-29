### Build
FROM node:10.16.3-alpine AS builder

WORKDIR /home/node/app
COPY . .

RUN npm install

#####
### Run

FROM node:10.16.3-alpine
ENV NODE_ENV=development
WORKDIR /home/node/app

# Install deps for production only
COPY ./package* ./
RUN npm install && \
    npm cache clean --force

# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE ${PORT}

# Start the app
CMD npm start