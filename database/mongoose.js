const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/taskManagerDB')

    .then(() => {
        console.log('MongoDB connected...');
    })
    .catch((err) => {
        console.log('Error:', err);
    });

module.exports = mongoose;
