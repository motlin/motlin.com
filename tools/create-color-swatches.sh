#!/bin/bash

# Create color swatches script
# Usage: ./create-color-swatches.sh COLOR_HEX...
# Example: ./create-color-swatches.sh AA0000 00AAAA 00AA00

# Ensure the colors directory exists
mkdir -p ./colors

# Loop through all color arguments
for color in "$@"; do
  # Remove any # prefix if present
  color=$(echo "$color" | sed 's/^#//')

  # Convert to uppercase for consistency
  color=$(echo "$color" | tr '[:lower:]' '[:upper:]')

  # Create a 15x15 pixel PNG with the specified color
  convert -size 15x15 "xc:#$color" "./colors/$color.png"
  echo "Created: ./colors/$color.png"

  # Create an SVG version of the same color
  cat > "./colors/$color.svg" << EOF
<svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
  <rect width="15" height="15" fill="#$color"/>
</svg>
EOF
  echo "Created: ./colors/$color.svg"
done

echo "Done! Created ${#@} color swatches (both PNG and SVG)."
