# Start from the official Node.js image
FROM node:18

# Install Python and pip
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv

# Create a virtual environment for Python
RUN python3 -m venv /env

# Install dependencies in the virtual environment
RUN /env/bin/pip install requests beautifulsoup4

# Set environment variables to use the virtual environment
ENV PATH="/env/bin:$PATH"

# Copy the application files into the container
COPY . /app

# Set the working directory
WORKDIR /app

# Install Node.js dependencies
RUN npm install

# Expose the necessary port
EXPOSE 3000

# Run the app
CMD ["npm", "run", "dev"]
