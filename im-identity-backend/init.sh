#!/bin/sh

# Execute this script as source ./init_git.sh for export variables to global environment outside the script scope

# Express Port
export EXPRESS_PORT="8082"
env | grep '^EXPRESS_PORT='

# User Service endpoint
export USER_SERVICE_ENDPOINT="http://localhost:8081/api/usersvc/users"
env | grep '^USER_SERVICE_ENDPOINT='
