#!/bin/bash

cd ~/server/soda
ls -la
nvm use default
yarn install
mv .env.production .env
yarn run deploy:prod
cd

exit
