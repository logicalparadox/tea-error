var ApiError = require('../..')('ApiError');

exports.use = function (fn) {
  if ('function' !== typeof fn) {
    throw new ApiError('API .use only accepts functions', null, arguments.callee);
  }

  return this;
};

exports.reg = function (fn) {
  if ('function' !== typeof fn) {
    throw new ApiError('API .reg only accepts functions');
  }

  return this;
};
