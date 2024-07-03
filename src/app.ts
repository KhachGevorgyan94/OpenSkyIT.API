import * as http         from 'http';
import * as mongoose     from 'mongoose';
import * as bluebird     from 'bluebird';

import Server            from './server';
import config            from './config';
import { runSeed }       from './helpers/services/seed';

bluebird.promisifyAll(mongoose);
(<any>mongoose).Promise = bluebird;


const server = http.createServer(Server).listen(config.port, () => {
  console.log('Server running on ' + config.port);
});

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {
    console.log('MongoDB connected successfully');
    runSeed();
  },
  err => { console.error('MongoDB connection error: ' + JSON.stringify(err)); }
);

