const R = require('ramda');

const empty = body => R.isEmpty(body) || R.isNil(body);

module.exports = { empty };
