const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

const TaskList = require('./database/models/taskList');
const Task = require('./database/models/task');

const PORT = 3000;

// app.use(cors());

app.use(
    (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Origin', 'Content-Type, X-requested-with, Accept');
        next();
    }
);

app.use(express.json());

app.get('/tasklists', (req, res) => {

    TaskList.find({})
        .then((lists) => res.status(200).send(lists))
        .catch((err) => console.error('Error: ', err));
});

app.get('/tasklists/:taskListId', (req, res) => {

    let taskListId = req.params.taskListId;
    TaskList.find({ _id: taskListId })
        .then((taskList) => {
            res.status(200).send(taskList);
        })
        .catch((err) => console.error('Error: ', err));
});

app.post('/tasklists', (req, res) => {

    let taskListObj = { 'title': req.body.title };
    TaskList(taskListObj).save()
        .then((taskList) => {
            res.status(201).send(taskList);
        })
        .catch((err) => console.error('Error: ', err));
});

app.put('/tasklists/:taskListId', (req, res) => {

    TaskList.findOneAndUpdate({ _id: req.params.taskListId }, { $set: req.body })
        .then((taskList) => res.status(200).send(taskList))
        .catch((err) => console.error('Error: ', err));
});

app.patch('/tasklists/:taskListId', (req, res) => {

    TaskList.findOneAndUpdate({ _id: req.params.taskListId }, { $set: req.body })
        .then((taskList) => res.status(200).send(taskList))
        .catch((err) => console.error('Error: ', err));
});

app.delete('/tasklists/:taskListId', (req, res) => {

    TaskList.findByIdAndDelete(req.params.taskListId)
        .then((taskList) => res.status(201).send(taskList))
        .catch((err) => console.error('Error: ', err));
});

app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}...`);
});

