FROM parity/parity:v1.8.2

# Parity PoA Torvalds Relay Network
# Torvalds Authority Node: GitToken


# Add Configuration files
WORKDIR /mnt/parity

# Add Configuration files
ADD config.toml .
ADD chain.json .

EXPOSE 30303 8545 8180 8456 30303/udp
CMD parity
