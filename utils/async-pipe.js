const asyncPipe =
  (...fns) =>
  (param) =>
    fns.reduce(async (result, next) => next(await result), param);

export default asyncPipe;
