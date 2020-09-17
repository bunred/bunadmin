FROM node:alpine

EXPOSE 1912

#ENV
ARG STAGING
ENV STAGING=${STAGING}

COPY . .

CMD yarn && npm run start
