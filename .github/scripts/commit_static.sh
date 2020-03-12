#!/usr/bin/env bash

if [ -z "$(git status --porcelain)" ]; then
  echo "Working directory clean, nothing to commit"
else
  git add static
  git commit -am "Update from Gulp - Updated static folder"
  git push
fi
