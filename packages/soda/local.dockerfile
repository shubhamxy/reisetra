FROM node:14.17.0-alpine As development

WORKDIR /usr/src/app/

EXPOSE  8080

CMD [ "yarn", "run", "dev" ]