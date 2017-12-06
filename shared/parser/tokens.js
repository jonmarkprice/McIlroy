// Maybe I should move this to test/
const t = { // types
	prim: {name: 'Primitive'},
	bool: {name: 'Boolean'},
	num: {name: 'Number'},
	char: {name: 'Char'},
	list: {name: 'List'},
	any: {name: 'Any'},
	// fn: (from, to) => ({name: 'Function', from, to}),
	fn: {name: 'Function'},
	var: id => ({name: 'Variable', id})
	// int: {type: 'Integer'} // XXX: not implemented
};

const fn = {
	// token: Function?
	cons        : {token: 'Value', type: t.fn, value: 'cons'},
	replicate   : {token: 'Value', type: t.fn, value: 'replicate'},
	sum         : {token: 'Value', type: t.fn, value: 'sum'},
	map         : {token: 'Value', type: t.fn, value: 'map'},
	not         : {token: 'Value', type: t.fn, value: 'not'},
	curry       : {token: 'Value', type: t.fn, value: 'curry'},
	flip        : {token: 'Value', type: t.fn, value: 'flip'},
	plus        : {token: 'Value', type: t.fn, value: '+'},
	minus       : {token: 'Value', type: t.fn, value: '-'},
	mult        : {token: 'Value', type: t.fn, value: '*'},
	exp         : {token: 'Value', type: t.fn, value: '^'},
	div         : {token: 'Value', type: t.fn, value: '/'},
	mult        : {token: 'Value', type: t.fn, value: '%'},
	and         : {token: 'Value', type: t.fn, value: 'and'},
	or          : {token: 'Value', type: t.fn, value: 'or'},
	concat      : {token: 'Value', type: t.fn, value: 'concat'},
	reduce      : {token: 'Value', type: t.fn, value: 'reduce'},
	zip         : {token: 'Value', type: t.fn, value: 'zip'},
	id          : {token: 'Value', type: t.fn, value: 'id'},
	into        : {token: 'Value', type: t.fn, value: 'into'},
	apply       : {token: 'Value', type: t.fn, value: 'apply'},
	eval        : {token: 'Value', type: t.fn, value: 'eval'},
	split       : {token: 'Value', type: t.fn, value: 'split'},
	uppercase   : {token: 'Value', type: t.fn, value: 'uppercase'},
	lowercase   : {token: 'Value', type: t.fn, value: 'lowercase'},
	length      : {token: 'Value', type: t.fn, value: 'length'},
	succ        : {token: 'Value', type: t.fn, value: 'succ'},
	eq          : {token: 'Value', type: t.fn, value: '='},
	filter      : {token: 'Value', type: t.fn, value: 'filter'},
	compose     : {token: 'Value', type: t.fn, value: 'compose'},
	cond        : {token: 'Value', type: t.fn, value: 'cond'}
};

function tok(x) {
    if (typeof x == 'number') {
        return {token: 'Value', type: t.number, value: x}
    }
    else if (typeof x == 'boolean') {
        return {token: 'Value', type: t.bool, value: x};
    }
    else if (typeof x == 'string') {
        if (x.length == 1) {
            return {token: 'Value', type: t.char, value: x};
        }
        else throw Error('Invalid token type. Chars must be length 1 strings.');
    }
}

const True = {token: 'Value', type: t.bool, value: true};
const False = {token: 'Value', type: t.bool, value: false};
const empty = {token: 'Value', type: t.list, value: []}
const ap = {token: 'Syntax', value: ':'};

module.exports = {t, fn, tok, ap, True, False, empty};
