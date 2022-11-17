import pino from 'pino';

const logger = ({ serviceName, enabled = true }) => {
  const options = Object.assign(
    {
      timestamp: pino.stdTimeFunctions.isoTime,
      customLevels: {
        trace: 100,
        debug: 100,
        info: 200,
        warn: 400,
        error: 500,
        fatal: 600
      },
      redact: ['token', 'access_token', 'password', 'secret'],
      useOnlyCustomLevels: true
    },
    { serviceName, enabled }
  );
  return pino(options);
};

export default logger;
