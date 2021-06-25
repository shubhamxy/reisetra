#!/bin/bash

_remote="ubuntu@api.reisetra.com"
_user="ubuntu"


echo "Local system name: $HOSTNAME"
echo "Local date and time: $(date)"

echo
echo "*** Running commands on remote host named $_remote ***"
echo

echo
echo "*** Removing server folder from $_remote ***"
echo

ssh -i "~/.ssh/aws/Soda.pem" -tt $_remote 'rm -rf server'


echo
echo "*** Uploading server to $_remote ***"
echo

rsync -avz -e "ssh -i ~/.ssh/aws/Soda.pem -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" --exclude-from './scripts/exclude-list' --progress soda ubuntu@api.reisetra.com:~/server

echo
echo "*** Deploying server on $_remote ***"
echo

ssh -i "~/.ssh/aws/Soda.pem" -tt $_remote < scripts/build.sh
