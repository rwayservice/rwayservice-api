import joi from 'joi';

const customError = ({ name, message }) => {
  const error = new Error(message);
  error.name = name;
  return error;
};

const sendError = (error, _req, res, _next) => {
  const { code, details, message, status: statusCode = 500 } = error;

  return res.status(statusCode).json(
    statusCode === 500
      ? { error: { message } }
      : statusCode === 401
      ? { error: { message: 'Access token is missing or invalid' } }
      : {
          error: {
            code,
            details,
            message
          }
        }
  );
};

const notFound = (req, res, next) => {
  notFoundError.status = 404;
  next(notFoundError);
};

const validateWithJoi = (data, schema) => {
  const { error } = schema.validate(data);
  if (error) throw customError(error);

  return data;
};
const detailSchema = joi
  .object()
  .keys({
    param: joi.string().required(),
    value: joi.string(),
    message: joi.string().required()
  })
  .required();

const validationErrorSchema = joi
  .object({
    code: joi.string(),
    name: joi.string().required(),
    message: joi.string().required(),
    details: joi.array().items(detailSchema).required()
  })
  .required();

const validationError = ({
  code,
  name = 'ValidationError',
  message,
  details
}) => {
  const err = validateWithJoi(
    {
      name,
      code,
      message,
      details
    },
    validationErrorSchema
  );

  const error = customError(err);
  error.details = details;
  return error;
};
export { customError, sendError, notFound, validationError };
