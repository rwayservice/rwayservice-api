import express from 'express';
import v1Routes from './v1';
import jwt from './middleware/jwt';
import { sendError, notFound } from '../utils/errors';

const app = express();

const startApp = () => {
  app
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(jwt())
    .use('/v1', v1Routes)
    .use(notFound)
    .use(sendError);
  return app;
};

export default startApp;
