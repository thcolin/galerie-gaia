#!/usr/bin/env bash

ls -l
npm run build
cd public
git status

if [ -z "$(git status --porcelain)" ]; then
  echo "Working directory clean, nothing to publish"
else
  git add .
  git commit --no-verify -am "Publish"
  git push origin gh-pages
fi
