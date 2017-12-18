const literals  = new Map([
  ['[]', []],
  ['true', true],
  ['false', false],
  ['0', 0]
]);

const syntax = new Set([':', '[', ']']);

const functions = new Set([
	"cons",
	"replicate",
	"sum",
	"map",
	"not",
	"curry",
	"flip",
	"+",
	"-",
	"*",
	"^",
	"/",
	"%",
	"and",
	"or",
	"concat",
	"reduce",
	"zip",
	"id",
	"into",
	"apply",
	"eval",
	"split",
	"uppercase",
	"lowercase",
	"length",
	"succ",
	"=",
	"filter",
	"compose"
	//"cond"
]);

module.exports = { functions, literals, syntax };
