FROM node:12.7.0-alpine

# Copy code to folder.
COPY . /home/app
WORKDIR /home/app

# Install Dependencies
RUN yarn && yarn global add pm2

EXPOSE 3000

CMD ["pm2-runtime", "bin/www"]
