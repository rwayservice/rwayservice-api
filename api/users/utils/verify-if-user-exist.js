'use strict';

import { isEmpty } from 'ramda';
import userModel from '../model/user.model.util';
import asyncPipe from '../../../utils/async-pipe';

import { tap } from 'ramda';

const doesUserExist = (user) =>
  asyncPipe(
    ({ phoneNumber }) => ({
      phoneNumber
    }),
    userModel.get,
    tap(console.log),
    (fetchedUser) => {
      const userExist = !isEmpty(fetchedUser);

      return {
        userExist,
        [fetchedUser]: fetchedUser[0]
      };
    }
  )(user);

export default doesUserExist;
