#!/bin/bash

# Set packages folder path
PACKAGES_FOLDER=packages

bold=$(tput bold)
normal=$(tput sgr0)

# Welcome message
echo "${bold}Welcome to the setup script!${normal}"
echo ""
echo "This script will setup .env all the packages in the $PACKAGES_FOLDER folder."
echo ""

# Iterate through all packages
for package in $PACKAGES_FOLDER/*; do
  # Check if package is a directory

    echo "${bold} Setting up $package ${normal}"

  if [ -d "$package" ]; then

    # Check if .setup file is present. If not, skip package
    if [ ! -f "$package/.setup" ]; then
      echo "Skipping $package"
      echo ""
      continue
    fi

    # Check if .env file presen. If present, ask user if  he wants to overwrite it
    if [ -f "$package/.env" ]; then
      read -p "Overwrite $package/.env? [y/N] " -n 1 -r
      echo
      if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        continue
      fi
    fi

    chmod +x "$package/setup.sh"
    bash "$package/setup.sh"

    echo ""
  fi
done
