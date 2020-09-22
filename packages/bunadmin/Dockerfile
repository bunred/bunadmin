FROM node:alpine

EXPOSE 1912

#ENV
ARG STAGING
ENV STAGING=${STAGING}

COPY . .

RUN yarn

RUN npm run build

CMD npm run start
