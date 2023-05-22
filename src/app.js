const bodyParser = require('body-parser');
const cors = require('cors');
const express = require("express");
const app = express();

// Cors
app.use(cors());

// Setup body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Error handling with express app middleware
app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		status: err.message,
		errors: err.errors
	});
});

module.exports = app;