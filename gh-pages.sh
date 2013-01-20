#!/bin/sh

# Update gh-pages branch
git branch -D gh-pages
git checkout -b gh-pages master

# Compile assets
compass compile . --env=production --force
git add -f css
git commit -m "Build GH pages"

# Push & reset
git push -f origin gh-pages
git checkout master
