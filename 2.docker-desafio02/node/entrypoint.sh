#!/bin/bash
# Install dependencies if they are not installed
if [ ! -d "node_modules" ]; then
    npm init -y
    npm install express mysql --save
fi

# Start the app
node index.js
