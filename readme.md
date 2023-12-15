# Node Chat Application

This project is a chat application built with Node.js, using Express as the web server and Handlebars as the templating engine. It demonstrates a basic chat functionality with a frontend implemented in Handlebars.

## Features

- Express server setup with Handlebars views.
- Real-time chat functionality.
- TypeScript integration for type-safe code.

## Prerequisites

Before you begin, ensure you have installed:

- Node.js
- npm (Node Package Manager)

## Installation

Clone the repository and install the dependencies:

```bash
git clone [Your Repository URL]
cd [Your Repository Directory]
npm install
```

## Scripts

The package.json includes the following scripts for development and building the application:
```
"scripts": {
  "test": "ts-node './test/unit_test.ts'",
  "build": "rimraf dist && tsc",
  "start": "tsc && nodemon './dist/main.js'"
},
```

* npm test runs the TypeScript unit tests.
* npm run build cleans the distribution directory and compiles the TypeScript files.
* npm start compiles the TypeScript files and starts the application with nodemon for auto-reloading.

## Application Structure

* /src - Contains the TypeScript source files.
* /src/views - Handlebars templates for rendering views.
* /dist - Compiled JavaScript files (generated by TypeScript Compiler).
* /test - Unit tests for the application.

## Usage
To start the server, run:

```
npm start
```

This will start the Express server on localhost (default port 3000). Navigate to http://localhost:3000 in your web browser to access the chat application.

## Building for Production
To build the application for production, run:
```
npm run build
```
This command will compile the TypeScript files into JavaScript in the dist directory.

## Contributing
Contributions to this project are welcome. Please fork the repository and submit a pull request.
