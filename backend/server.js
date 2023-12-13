require('./environment');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080;

app.listen(PORT);
console.log(`🚀 App listening on the port ${PORT}`);