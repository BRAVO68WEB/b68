#!/bin/bash

ENV_PATH=packages/config-store/.env

# Prompt user for input
read -p "Enter username: " username
read -p "Enter password: " password
read -p "Enter port: " port

rm -rf $ENV_PATH

# Save the input to a file
echo "BASIC_USERNAME=$username" >> $ENV_PATH
echo "BASIC_PASSWORD=$password" >> $ENV_PATH
echo "CS_PORT=$port" >> $ENV_PATH

sed "s/0000/$port/g" packages/config-store/Dockerfile.example > packages/config-store/Dockerfile

# Echo a message to confirm the file has been saved
echo "Configuration saved to packages/config-store/.env"
