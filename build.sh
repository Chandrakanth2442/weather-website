#!/bin/bash

# Add all changes to staging
git add .

# Commit changes with a generic message
git commit -m "New commit"

# Push changes to the current branch
git push

echo "Changes have been pushed successfully!"

# Run the application locally with nodemon
nodemon src/app.js
