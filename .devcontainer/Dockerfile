FROM mcr.microsoft.com/devcontainers/typescript-node:0-18
RUN apt-get update

# Install bash-completion
RUN apt-get -y install bash-completion

# Install git-secrets
RUN cd /tmp \
  && git clone https://github.com/awslabs/git-secrets.git \
  && cd /tmp/git-secrets \
  && make install \
  && cd /tmp \
  && rm -fr /tmp/git-secrets

# Install AWSCLIv2
RUN cd /tmp \
  && curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
  && unzip awscliv2.zip \
  && ./aws/install \
  && rm -fr ./aws awscliv2.zip
