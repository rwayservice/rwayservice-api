import { EventEmitter } from 'events';
import mongoose from 'mongoose';
import logger from './logger';

const log = logger({ serviceName: 'mongodBUtils' });

const name = 'MongoDB';

const mongooseConnector = (dbURL) => {
  // mongoose.set('useNewUrlParser', true);
  // mongoose.set('useUnifiedTopology', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);

  const connections = Object.create(EventEmitter.prototype);
  EventEmitter.call(connections);

  mongoose.connection
    .on('open', () => {
      const msg = 'Connected to mongodb successfully';
      connections.emit('connected', {
        instance: mongoose.connection,
        name
      });
      log.info(msg);
    })
    .on('error', (err) => {
      log.error(err);
      log.error('err:connection:reason', err.reason);
    })
    .on('close', () => {
      const msg = 'Disconnected mongodb successfully';
      log.info(msg);
    });

  return Object.assign(connections, {
    name,
    connect() {
      mongoose.connect(dbURL);
    },
    disconnect() {
      mongoose.connection.close();
      connections.emit('disconnected');
    }
  });
};

const getDBConnector = (dbUrl) => mongooseConnector(dbUrl);

const isConnected = () => mongoose.connection.readyState === 1;

export { getDBConnector, isConnected };
