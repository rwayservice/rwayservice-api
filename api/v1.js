import { Router } from 'express';
import users from './users/v1.routes';
const app = Router();

app.use('/users', users);

export default app;
