# Use the official Node.js image as the base
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables for MySQL connection
ENV MYSQL_HOST=your_mysql_host
ENV MYSQL_PORT=your_mysql_port
ENV MYSQL_USER=your_mysql_user
ENV MYSQL_PASSWORD=your_mysql_password
ENV MYSQL_DBNAME=your_mysql_dbname

# Expose the port on which your Node.js application will run
EXPOSE 3030

# Specify the command to run your Node.js application
CMD ["node", "app.js"]