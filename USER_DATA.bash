#!/bin/bash

# Update the instance
sudo apt-get update

# Install Git
sudo apt install npm

# Clone the repository
git clone https://github.com/uninrk/CS369-Project.git

# Navigate to the project directory and install dependencies
cd CS369-Project
npm install

# Start the application
npm start