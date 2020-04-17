const express = require('express');

const SchemeRouter = require('./schemes/');

const server = express();

server.use(express.json());
server.use('/api/projects', SchemeRouter);

module.exports = server;