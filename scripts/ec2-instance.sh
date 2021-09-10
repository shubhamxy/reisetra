#!/bin/bash

## reboot instance in case it hangs up.
# aws ec2 reboot-instances --instance-ids i-04662dff48251f895
## update cloudflare with public dns of ec2 instance.
# cfcli edit api.reisetra.com (aws ec2 describe-instances --instance-ids i-04662dff48251f895 | jq -r "[[.Reservations[].Instances[]]][0][0] | .PublicDnsName")

echo "# Install nvm"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

echo "# Install Node v 14.19.0 ie. same as local"
nvm install v14.19.0

echo "# Insall pm2"
npm install pm2 -g

# ssh-keygen -t ed25519 -C "25664213+shubhamxy@users.noreply.github.com"

# eval "$(ssh-agent -s)"

# ssh-add ~/.ssh/id_ed25519

# cat ~/.ssh/id_ed25519.pub

# echo "cp paste the generated key on repository > settings > deploy keys."


# echo "# git clone repo"
# git clone git@github.com:shubhamxy/reisetra.git

# echo "# Install Docker"
# sudo apt-get install \
#     apt-transport-https \
#     ca-certificates \
#     curl \
#     gnupg \
#     lsb-release


#  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg



# echo \
#   "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
#   $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null


#  sudo apt-get update
#  sudo apt-get install docker-ce docker-ce-cli containerd.io

# # sudo groupadd docker

# sudo usermod -aG docker $USER

# newgrp docker



# cd reisetra/soda

# echo "# Run docker compose"
# docker-compose up -d

# yarn install
cd reisetra/soda

npm i -g yarn

yarn install

yarn run build


echo "# Run pm2"


pm2 start ecosystem.config.js --env production

echo "## done"
