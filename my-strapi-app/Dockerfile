FROM strapi/strapi

# Set working directory for Strapi
WORKDIR /srv/app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose Strapi's default port
EXPOSE 1337

# Run Strapi
CMD ["npm", "run", "develop"]
