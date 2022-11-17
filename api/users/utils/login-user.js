'use strict';

import joi from 'joi';
import asyncPipe from '../../../utils/async-pipe';
import hashUserPassword from '../../../utils/hash-password';
import doesUserExist from './verify-if-user-exist';
import userModel from '../model/user.model.util';
import { removePassword } from '../../../utils/dataTransformation';

import { tap } from 'ramda';

const validateLoginData = (data) => {
  const schema = joi.object().keys({
    phoneNumber: joi.string().required(),
    password: joi.string().required()
  });

  const { error, value } = schema.validate(data);

  if (error) throw new Error(error.message);

  return value;
};

const createOrFindUser = ({ userExist, fetchedUser }) => {
  if (!userExist) return userModel.create({ ...rest });
  return {
    ...fetchedUser
  };
};

const loginUser = async (data) =>
  asyncPipe(
    validateLoginData,
    doesUserExist,
    tap(console.log),
    hashUserPassword,
    createOrFindUser,
    removePassword
  )(data);

export default loginUser;
