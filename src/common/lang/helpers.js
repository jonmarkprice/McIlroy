const { parseStack } = require('./parse.js'); 

// basically run 2.0
function parse(...program : Token[]) : Token | Error {
    const acc = parseStack(program, [], true, 0);
    if (acc.ok()) {
      if (acc.right().stack.length === 1) {
        return acc.right().stack[0];
      }
    }
    else {
      return new Error(acc.left());
    }
}

module.exports = { parse };