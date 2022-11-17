import { MongoMemoryServer } from 'mongodb-memory-server';
import { getDBConnector } from '../utils/mongoose';

const testDbConnection = async () => {
  const dbName = 'roadway-service-test-db';
  const mongoServer = new MongoMemoryServer({
    instance: {
      port: 54080,
      dbName,
      storageEngine: 'wiredTiger'
    }
  });

  if (mongoServer.state !== 'running') await mongoServer.start();

  return getDBConnector(mongoServer.getUri(dbName));
};

export { testDbConnection };
