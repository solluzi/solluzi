#!/bin/bash

# Exit immediately if any command exits with a non-zero status
set -e

current_directory=$(pwd)

echo "Current directory: $current_directory"

# Hardcoded repository URL
repository_url="https://gitlab.com/solluzi/solluzi.git"

# Hardcoded branch
branch="1.0.3"

# Hardcoded target folder
target_folder="$current_directory"

# Create a temporary folder
tmp_folder=$(mktemp -d)

git config --global --add safe.directory /var/www/html

# Clone the repository to the temporary folder
git clone -b "$branch" --single-branch "$repository_url" "$tmp_folder"


# Copy desired folders and files to the target folder
cp -r "$tmp_folder/bootstrap.php" "$target_folder"
cp -r "$tmp_folder/public/index.php" "$target_folder/public"
cp -r "$tmp_folder/craft" "$target_folder"

# Remove the temporary folder
rm -rf "$tmp_folder"

echo "Repository cloned, folders and files copied to $target_folder, and temporary folder removed successfully."
