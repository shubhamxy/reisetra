#!/bin/bash

# rsync -avz -e "ssh -i ~/.ssh/aws/Soda.pem -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" --exclude-from './scripts/exclude-list' --progress soda ubuntu@api.reisetra.com:~/server

# ssh -i "~/.ssh/aws/Soda.pem" ubuntu@api.reisetra.com

_remote="ubuntu@api.reisetra.com"
_user="ubuntu"

echo "Local system name: $HOSTNAME"
echo "Local date and time: $(date)"

echo
echo "*** Running commands on remote host named $_remote ***"
echo
ssh -i "~/.ssh/aws/Soda.pem" $_remote <<'EOL'
  cd ~/server/soda
  pm2 start ecosystem.config.js --env production
  ls -la
  nvm use default
  yarn install
  mv .env.production .env
  yarn run start:prod
  cd
EOL
