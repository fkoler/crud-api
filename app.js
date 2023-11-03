const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}...`);
});

