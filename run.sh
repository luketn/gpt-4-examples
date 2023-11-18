#!/bin/bash

set -e

# Check if OPENAI_API_KEY is not set
if [ -z "$OPENAI_API_KEY" ]; then
    echo "Environment variable OPENAI_API_KEY is not set. Please find your OpenAI API key and set it as an environment variable so that the examples can use it. e.g. export OPENAI_API_KEY=\"sk-my-key\"."
    exit 1
fi

#check the node version is 14+
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js 14+ to continue."
    exit 1
fi
node -e 'const [major] = process.version.slice(1).split("."); if (parseInt(major) < 14) { console.error("Node.js version is less than 14. Exiting."); process.exit(1); }'

# run the first example
cd example-1-the-dude-system-prompt
npm install
npm test
