const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


// Basic express server configuration
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Server index.html when visiting the naked URL
app.get('/', (request,response) => {
  response.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const port = process.env.PORT || 8080;
console.log("Starting server on port: " + port)
app.listen(port);