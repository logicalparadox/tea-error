module.exports = process.env.error_COV
  ? require('./lib-cov/error')
  : require('./lib/error');
