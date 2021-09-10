#!/bin/bash

echo "*** Updating ***"
cd ~/server/soda
nvm use v14.17.0
yarn install
mv .env.production .env
yarn run migrate
yarn run start
cd

exit
