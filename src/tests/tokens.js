// Maybe I should move this to test/

const fn = {
	cons        : {type: 'Primitive', value: 'cons'},
	replicate   : {type: 'Primitive', value: 'replicate'},
	sum         : {type: 'Primitive', value: 'sum'},
	map         : {type: 'Primitive', value: 'map'},
	not         : {type: 'Primitive', value: 'not'},
	curry       : {type: 'Primitive', value: 'curry'},
	flip        : {type: 'Primitive', value: 'flip'},
	plus        : {type: 'Primitive', value: '+'},
	minus       : {type: 'Primitive', value: '-'},
	mult        : {type: 'Primitive', value: '*'},
	exp         : {type: 'Primitive', value: '^'},
	div         : {type: 'Primitive', value: '/'},
	mult        : {type: 'Primitive', value: '%'},
	and         : {type: 'Primitive', value: 'and'},
	or          : {type: 'Primitive', value: 'or'},
	concat      : {type: 'Primitive', value: 'concat'},
	reduce      : {type: 'Primitive', value: 'reduce'},
	zip         : {type: 'Primitive', value: 'zip'},
	id          : {type: 'Primitive', value: 'id'},
	into        : {type: 'Primitive', value: 'into'},
	apply       : {type: 'Primitive', value: 'apply'},
	eval        : {type: 'Primitive', value: 'eval'},
	split       : {type: 'Primitive', value: 'split'},
	uppercase   : {type: 'Primitive', value: 'uppercase'},
	lowercase   : {type: 'Primitive', value: 'lowercase'},
	length      : {type: 'Primitive', value: 'length'},
	succ        : {type: 'Primitive', value: 'succ'},
	eq          : {type: 'Primitive', value: '='},
	filter      : {type: 'Primitive', value: 'filter'},
	compose     : {type: 'Primitive', value: 'compose'},
	cond        : {type: 'Primitive', value: 'cond'}
};

function tok(x) {
    if (typeof x == 'number') {
        return {type: 'Number', value: x}
    }
    else if (typeof x == 'boolean') {
        return {type: 'Boolean', value: x};
    }
    else if (typeof x == 'string') {
        if (x.length == 1) {
            return {type: 'Char', value: x};
        }
        else throw Error('Invalid token type. Chars must be length 1 strings.');
    }
}

const True = {type: 'Boolean', value: true};
const False = {type: 'Boolean', value: false};

const ap = {type: 'Syntax', value: ':'};

module.exports = {fn, tok, ap, True, False};