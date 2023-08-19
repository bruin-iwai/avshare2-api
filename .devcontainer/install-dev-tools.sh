#!/usr/bin/env bash

# Install git-secrets
CWD=$(pwd)
cd /tmp \
  && git clone https://github.com/awslabs/git-secrets.git \
  && cd /tmp/git-secrets \
  && sudo make install \
  && cd /tmp \
  && rm -fr /tmp/git-secrets
cd ${CWD}
(git secrets --install --force | /bin/true) && git secrets --register-aws

# Install dependencies
npm ci
