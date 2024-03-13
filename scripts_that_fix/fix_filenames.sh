#!/bin/bash

# Specify the relative directory path
directory="$1"

# Iterate over each file in the directory
for file in "$directory"/*; do
    # Check if the current item is a file
    if [[ -f "$file" ]]; then
        # Get the directory path and base filename
        dir=$(dirname "$file")
        base=$(basename "$file")

        # Convert the filename to lowercase
        lowercase_file=$(echo "$base" | tr '[:upper:]' '[:lower:]')

        # Replace hyphens and spaces with underscores
        new_file=$(echo "$lowercase_file" | tr '-' '_' | tr ' ' '_')

        # Rename the file
        mv "$file" "$dir/$new_file"
    fi
done

echo "Filenames have been converted and renamed."
