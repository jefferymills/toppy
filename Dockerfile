FROM node:8.9.1
WORKDIR /Users/jeffmills/Sites/mine/toppy
ADD . /Users/jeffmills/Sites/mine/toppy
COPY package.json .
RUN yarn install
EXPOSE 3005
CMD ["yarn", "start"]