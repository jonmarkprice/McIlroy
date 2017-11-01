const R = require('ramda');

// The either functor

let Left = function(x) {
    this.__value = x;
}

Left.of = function(x) {
    return new Left(x);
}

Left.prototype.map = function(f) {
    return this;
}

const Right = function(x) {
    this.__value = x;
}

Right.of = function(x) {
    return new Right(x);
}

Right.prototype.map = function(f) {
    return Right.of(f(this.__value));
}

// usage
const prependB = (str) => ('b' + str);

let x = Right.of('rain').map(prependB);
console.log(x)

x = Left.of('rain').map(prependB)
x

const moment = require('moment');

// Example
const getAge = R.curry((now, user) => {
    const birthdate = moment(user.birthdate, 'YYYY-MM-DD');
    return (birthdate.isValid()
        ? Right.of(now.diff(birthdate, 'years'))
        : Left.of('Birthdate could not be parsed.'));
});

x = getAge(moment(), {birthdate: '2005-12-12'});
x

x = getAge(moment(), {birthdate: '...'})
x

/////////

// fortune :: Number -> String
const fortune = R.compose(R.concat('If you survive, you will be '), String, R.add(1));

// zoltar :: User -> Either(String, _)
const zoltar = R.compose(
    //R.map(console.log), 
    R.map(fortune), 
    getAge(moment())
);

x = getAge(moment())({birthdate: '2015-01-01'})
x

// Error: 12 is not a string...
x = zoltar({birthdate: '2005-12-12'})
x

x = zoltar({birthdate: 'balloons'});
x


// Either will break the value out of its container
// either :: (a -> c) -> (b -> c) -> Either a b -> c
const either = R.curry((f, g, e) => {
    switch(e.constructor) {
        case Left   : return f(e.__value);
        case Right  : return g(e.__value);
    }
});

//const z2 = R.compose(either(R.identity, fortune), getAge);
const zoltar2 = R.pipe(getAge(moment()), either(R.identity, fortune));
x = zoltar2({birthdate: '2015-12-12'})
x

x = zoltar2({birthdate: 'balloons'});
x

x = R.identity('a')
x

