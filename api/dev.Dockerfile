FROM node:21
WORKDIR /api

# Install necessary dependencies for Puppeteer
RUN apt-get update
RUN apt-get install git -y

CMD yarn; yarn start:dev