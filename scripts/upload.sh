#!/bin/bash

rsync -avz -e "ssh -i ~/.ssh/aws/Soda.pem -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" --exclude-from './scripts/exclude-list' --progress soda ubuntu@api.reisetra.com:~/server

