NodeLite

NodeLite is a simple and lightweight backend framework designed to kickstart your web application development with minimal effort. It provides a foundational structure for handling API requests, routing, and basic middleware functionality, making it ideal for beginners and small projects.

Features

Lightweight and Simple: Focuses on essentials without unnecessary complexity.

Customizable: Easily extend the framework to meet your specific needs.

Built-in Routing: Quickly set up routes for your application.

Middleware Support: Add custom middleware for request processing.

Installation

To install NodeLite, use npm:

npm install nodelite

Quick Start

Create a new project directory:

mkdir my-nodelite-app
cd my-nodelite-app

Initialize your project:

npm init -y

Install NodeLite:

npm install nodelite

Set up your application:

Create an app.js file with the following content:

const NodeLite = require('nodelite');
const app = new NodeLite();

app.get('/', (req, res) => {
    res.send('Welcome to NodeLite!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

Run your application:

node app.js

Visit http://localhost:3000 in your browser to see the application in action.

Documentation

Routing

Define routes using the following methods:

app.get(path, callback)

app.post(path, callback)

app.put(path, callback)

app.delete(path, callback)

Example:

app.get('/hello', (req, res) => {
    res.send('Hello, world!');
});

Middleware

Add middleware functions for request processing:

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

Error Handling

Define custom error handlers:

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

License

NodeLite is licensed under the MIT License.

Acknowledgments

Built with ❤️ by Pedro Dominguez in Oklahoma City 🌆.

