'use strict';

import crypto from 'crypto';
import { curry } from 'ramda';

let createHashString = (secret, text) => {
  const sha256Hasher = crypto.createHmac('sha256', secret);
  const hash = sha256Hasher.update(text).digest('hex');
  return hash;
};

createHashString = curry(createHashString);

const secret = process.env.HASH_SECRET;

const hashPassword = createHashString(secret);

const hashUserPassword = ({ password, ...rest }) => {
  return {
    ...rest,
    password: hashPassword(password)
  };
};

export default hashUserPassword;
