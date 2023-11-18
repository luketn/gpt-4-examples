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

# List example directories
directories=$(find . -maxdepth 1 -type d -name "example-*")

# Check if any directories were found
if [ -z "$directories" ]; then
    echo "No example directories found."
    exit 1
fi

# Loop through each directory
for dir in $directories; do
    echo "Running example $dir..."

    # Change to directory
    cd "$dir"

    # Run the example
    npm install
    npm test

    # Return to the original directory
    cd ..
done

echo "Completed all examples."
