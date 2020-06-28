FROM node:alpine

EXPOSE 1912

#ENV
ARG STAGING
ENV STAGING=${STAGING}

COPY out out

RUN yarn global add serve
CMD serve -s out -l 1912
