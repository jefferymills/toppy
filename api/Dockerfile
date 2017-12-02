FROM node:8.9.1
WORKDIR /Users/jeffmills/Sites/mine/toppy/api
ADD . /Users/jeffmills/Sites/mine/toppy/api
COPY package.json .
RUN yarn install
EXPOSE 9080
CMD ["yarn", "start"]