#!/usr/bin/env bash

sizes=(
  32
  128
  180
  192
)

cd ../public

for size in "${sizes[@]}"
do
  dimensions="$size""x""$size"
  convert -density "256x256" -resize $dimensions -background transparent favicon.svg \
          -define icon:auto-resize -colors 256 "favicon-$size.ico"
done

mv favicon-32.ico favicon.ico
