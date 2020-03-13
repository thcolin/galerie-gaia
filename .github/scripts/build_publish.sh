#!/usr/bin/env bash

npm run build
cd public

if [ -z "$(git status --porcelain)" ]; then
  echo "Working directory clean, nothing to publish"
else
  git add .
  git commit --no-verify -am "Publish"
  git push origin gh-pages
fi
