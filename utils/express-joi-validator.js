import joi from 'joi';
import extend from 'extend';

import { validationError } from './errors';

const getDetails = ({ context, message }) => {
  const value = context && context.value;
  const label =
    context && context.label ? context.label : context && context.key;

  const newDetails = {
    message: message,
    param: label
  };

  if (value) newDetails.value = value + '';

  return newDetails;
};

function reformatJoiErrors(joiError) {
  const details = joiError.details.map(getDetails);

  const error = validationError({
    message: 'error validating req parameters',
    details,
    name: 'ReqValidationError'
  });

  error.status = 400;
  return error;
}

const expressJoiValidator = ({ schema, options = { stripUnknown: true } }) => {
  const validateRequest = (req, res, next) => {
    if (!schema) next();

    const toValidate = Object.keys(schema).reduce((acc, key) => {
      acc[key] = req[key];
      return acc;
    }, {});

    const { error, value } = joi.object(schema).validate(toValidate, options);

    if (error) {
      return next(reformatJoiErrors(error));
    }

    extend(req, value);

    return next();
  };

  return validateRequest;
};

export default expressJoiValidator;
