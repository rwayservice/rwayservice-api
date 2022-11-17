import createToken from '../../utils/json-web-token';
import asyncPipe from '../../utils/async-pipe';
import respond from '../../utils/express-response';
import httpStatus from '../../utils/http-status';

import { tap } from 'ramda';
import { loginUser } from './utils';

const addJWTToken = (user) => ({
  user,
  token: createToken({
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRES_IN,
    id: user.id
  })
});

const signIn = (req, res, next) =>
  asyncPipe(
    loginUser,
    // tap(console.log),
    addJWTToken,
    respond({ res, status: httpStatus.OK })
  )(req.body).catch(next);

export { signIn };
