import { Router } from 'express';
import joi from 'joi';

import expressJoiValidator from '../../utils/express-joi-validator';
import { signIn } from './user.controller';

const signInSchema = {
  body: {
    phoneNumber: joi.string().required(),
    password: joi.string().required()
  }
};

const app = Router();

app.post('/signin', expressJoiValidator({ schema: signInSchema }), signIn);

export default app;
