#!/bin/bash

source "packages/config-store/.env"
echo "Fetching API Key with env file from Config Store"
wget --user $BASIC_USERNAME --password $BASIC_PASSWORD http://127.0.0.1:$CS_PORT/private/api.env -O packages/api/.env