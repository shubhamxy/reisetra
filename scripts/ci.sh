#!/bin/bash

USERNAME="ubuntu"
SERVER_HOST="ubuntu@api.reisetra.com"
SERVER_KEY=${{ secrets.SSH_PRIVATE_KEY }}

source ./scripts/upload.sh
