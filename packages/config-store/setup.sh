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
echo "PORT=$port" >> $ENV_PATH

# Echo a message to confirm the file has been saved
echo "Configuration saved to packages/config-store/.env"
