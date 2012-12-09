var api = require('./api.js');

console.log('');
console.log('=== with ssf ===');
console.log('');

try {
  api.use('string?');
} catch (ex) {
  console.log(ex.stack);
}

console.log('');
console.log('=== without ssf ===');
console.log('');

try {
  api.reg('string?');
} catch (ex) {
  console.log(ex.stack);
}

console.log('');
