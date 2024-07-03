"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const server_1 = require("./server");
const config_1 = require("./config");
const seed_1 = require("./helpers/services/seed");
bluebird.promisifyAll(mongoose);
mongoose.Promise = bluebird;
const server = http.createServer(server_1.default).listen(config_1.default.port, () => {
    console.log('Server running on ' + config_1.default.port);
});
mongoose.connect(config_1.default.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('MongoDB connected successfully');
    seed_1.runSeed();
}, err => { console.error('MongoDB connection error: ' + JSON.stringify(err)); });
