FROM node:latest AS builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install \
&& npm run swagger-autogen \
&& npm run build

FROM node:latest AS final
WORKDIR /usr/src/app
COPY --from=builder ./usr/src/app/dist ./dist
COPY package.json .
RUN npm install
CMD ["npm", "start"]
