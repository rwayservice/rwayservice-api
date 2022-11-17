import startApp from './app';
import logger from '../utils/logger';
import { getDBConnector as db, isConnected } from '../utils/mongoose';

const log = logger({ serviceName: 'api' }).child({ type: 'api/server' });

const PORT = 3001;
const delay = 3 * 2 * 1000;
let server;

const onReady = async () => {
  if (server) return server;
  server = startApp().listen(PORT, () => {
    log.info(`Server running on port ${PORT}`);
  });
};

const startServer = async () => {
  if (!isConnected()) {
    await db()
      .on('connected', async () => {
        await onReady();
      })
      .on('disconnected', async () => {
        log.info('connections closed');
        process.emit('SIGINT');
      })
      .connect();
  }
};

const onShutDown = async () => {
  if (server) {
    log.info(`shutting down server on port ${PORT}`);
    if (server.address()) {
      return server.close((err) => {
        if (err) {
          log.error(err);
        }
      });
    }
    return server;
  }
};

const shutDown = async ({ event }) => {
  log.info(`Shutting down on ${event} event`);
  if (isConnected()) await db().disconnect();
  await onShutDown();
};

process
  .on('SIGTERM', (err) => {
    if (err) log.error(err);
    return setTimeout(async () => {
      await shutDown({ event: 'SIGTERM' });
    }, delay);
  })
  .on('SIGINT', (err) => {
    if (err) log.error(err);
    return setTimeout(async () => {
      await shutDown({ event: 'SIGINT' });
    }, delay);
  })
  .on('unhandledRejection', (error) => {
    log.error(error);
    return setTimeout(async () => {
      process.emit('SIGTERM');
    }, delay);
  });

try {
  startServer();
} catch (error) {
  log.error(`could not start app. ${error}`);
}
