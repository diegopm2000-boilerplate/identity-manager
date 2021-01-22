#!/bin/bash

newman run 'User Service.postman_collection.json' -e 'localdev.postman_environment.json' --folder 'Automatic Testing' --globals 'test.postman_globals.json' --ignore-redirects