require('./src/utils/env.util.js');
const express = require('express');

const app = express();
const port = process.env.PORT ?? '3001';

app.get('/', (req, res) => {
	res.send('Express');
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});