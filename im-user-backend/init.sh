#!/bin/sh

# Execute this script as source ./init_git.sh for export variables to global environment outside the script scope

# Express Port
export EXPRESS_PORT="8081"
env | grep '^EXPRESS_PORT='

# Mongo URL
export MONGO_URL="mongodb://admin:admin@localhost:27017"
env | grep '^MONGO_URL='
