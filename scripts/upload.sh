#!/bin/bash

echo "*** Local system name: $HOSTNAME ***"
echo "***  Local date and time: $(date) ***"

echo
echo "*** Running commands on remote host named $SERVER_HOST ***"
echo

echo
echo "*** Removing server folder from $SERVER_HOST ***"
echo

ssh -i $SERVER_KEY -tt $SERVER_HOST 'rm -rf server'

echo
echo "*** Uploading server to $SERVER_HOST ***"
echo

rsync -avz -e "ssh -i $SERVER_KEY -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" --exclude-from './scripts/exclude-list' --progress packages/soda $SERVER_HOST:~/server

echo
echo "*** Deploying server on $SERVER_HOST ***"
echo

ssh -i $SERVER_KEY -tt $SERVER_HOST < scripts/build.sh
