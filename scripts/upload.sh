#!/bin/bash
# ssh -i "~/.ssh/aws/Soda.pem" ubuntu@api.reisetra.com

_remote="ubuntu@api.reisetra.com"
_user="ubuntu"

rsync -avz -e "ssh -i ~/.ssh/aws/Soda.pem -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" --exclude-from './scripts/exclude-list' --progress soda ubuntu@api.reisetra.com:~/server
echo "Local system name: $HOSTNAME"
echo "Local date and time: $(date)"

echo
echo "*** Running commands on remote host named $_remote ***"
echo

ssh -i "~/.ssh/aws/Soda.pem" -tt $_remote < scripts/deploy.sh

