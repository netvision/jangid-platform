#!/bin/bash

echo "Setup Local Database"
echo "-------------------"
echo "This script will create the 'jangid_admin' user and 'jangid_dev' database."
echo "You will need to provide the password that matches your .env file."
echo ""

read -s -p "Enter the password for 'jangid_admin' (from your .env): " DB_PASSWORD
echo ""

if [ -z "$DB_PASSWORD" ]; then
  echo "Password cannot be empty."
  exit 1
fi

echo "Creating user 'jangid_admin'..."
psql postgres -c "CREATE USER jangid_admin WITH PASSWORD '$DB_PASSWORD' SUPERUSER;"

echo "Creating database 'jangid_dev'..."
psql postgres -c "CREATE DATABASE jangid_dev OWNER jangid_admin;"

echo "Done! Try running 'npm run dev' again."
