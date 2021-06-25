#!/bin/bash

cd ~/server/soda
nvm use default
yarn install
mv .env.production .env
yarn run migrate:prod
yarn run deploy:prod
cd

exit
