#!/bin/bash

# Specify the directory path
directory="$1"

# Check if the directory is provided
if [[ -z "$directory" ]]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

# Iterate over each file in the directory
for file in "$directory"/*; do
    # Check if the current item is a file
    if [[ -f "$file" ]]; then
        # Get the directory path and base filename
        dir=$(dirname "$file")
        base=$(basename "$file")

        # Check if the filename contains the substring " (2)"
        if [[ "$base" == *" (2)"* ]]; then
            # Remove the substring " (2)" from the filename
            new_file=${base//" (2)"/}

            # Rename the file
            mv "$file" "$dir/$new_file"
            echo "Renamed: $base -> $new_file"
        fi
    fi
done

echo "Substring ' (2)' removal from filenames completed."
