#!/bin/bash

# Specify the directory path
directory="$1"

# Specify the substring to remove
substring="$2"

# Check if the directory and substring are provided
if [[ -z "$directory" || -z "$substring" ]]; then
    echo "Usage: $0 <directory> <substring>"
    exit 1
fi

# Iterate over each file in the directory
for file in "$directory"/*; do
    # Check if the current item is a file
    if [[ -f "$file" ]]; then
        # Get the directory path and base filename
        dir=$(dirname "$file")
        base=$(basename "$file")

        # Check if the filename contains the substring
        if [[ "$base" == *"$substring"* ]]; then
            # Remove the substring from the filename
            new_file=${base//"$substring"/}

            # Rename the file
            mv "$file" "$dir/$new_file"
            echo "Renamed: $base -> $new_file"
        fi
    fi
done

echo "Substring removal from filenames completed."
