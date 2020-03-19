#!/usr/bin/env bash

git config --global user.name 'Thomas Colin'
git config --global user.email 'thcolin@users.noreply.github.com'
npm install -g gulp
npm install
gulp

if [ -z "$(git status --porcelain)" ]; then
  echo "Working directory clean, nothing to commit"
else
  git add static
  git commit --no-verify -am "Update from Gulp - Updated static folder"
  git pull --rebase
  git push
fi
