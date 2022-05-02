#!/bin/bash

# start node based on ENV
if [ $NODE_ENV == "production" ]; then
  echo "NOT YET running in production..."

elif [ $NODE_ENV == "test" ]; then
  echo "SOON TO BE Running tests..."
  sleep 5
  # node_modules/.bin/jest --config /usr/src/app/jest.config-e2e.js --watchAll
else
  echo "Running in development..."
  sleep 5
  npm run dev
fi
