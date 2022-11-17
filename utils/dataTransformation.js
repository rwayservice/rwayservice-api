'use strict';

import { omit } from 'ramda';

const omitVersion = omit(['__v']);

const transformId = ({ _id, ...rest }) =>
  omitVersion({
    id: _id,
    ...rest
  });

const removePassword = omit(['password']);

export { transformId, removePassword };
