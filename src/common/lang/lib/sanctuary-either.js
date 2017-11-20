const S = require('sanctuary');

const last = data => S.maybeToEither('empty.', S.last(data));
const dropLast = n => data => S.maybeToEither('not enough items', S.dropLast(n)(data));
const takeLast = n => data => S.maybeToEither('not enough items', S.takeLast(n)(data));

module.exports = {
    last, dropLast, takeLast
};

