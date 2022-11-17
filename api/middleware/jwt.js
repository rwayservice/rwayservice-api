import { expressjwt } from 'express-jwt';

const jwt = () =>
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }).unless({
    path: ['/v1/users/signup', '/v1/users/signin', '/v1/users/admin/token']
  });

export default jwt;
