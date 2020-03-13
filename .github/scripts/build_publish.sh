#!/usr/bin/env bash

npm run build
cd public
git add .
git commit --no-verify -am "Publish"
git push origin gh-pages
