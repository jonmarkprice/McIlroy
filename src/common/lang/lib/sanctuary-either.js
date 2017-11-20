const S = require('sanctuary');

const last = data => S.maybeToEither('empty', S.last(data));
const dropLast = n => data => S.maybeToEither('not enough items', S.dropLast(n)(data));
const takeLast = n => data => S.maybeToEither('not enough items', S.takeLast(n)(data));
const gets = S.curry3((cond, props, data) =>
  S.maybeToEither('not prop with matching type', S.gets(cond, props, data))); 

module.exports = {
    last, dropLast, takeLast, gets
};

