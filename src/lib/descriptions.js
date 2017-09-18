const descriptions = new Map([
  [':', {
    name: 'Application operator (:)',
    text: 'Used to invoke any function.',
    example: {
      in: [1, 2, '+', ':'],
      expect: 3
    }
  }],
  ['cons', {
    text: 'Construct a list, inpsired by Lisp cons.',
    example: {
      in: [[1, 2], 3, 'cons', ':'],
      expect: [1, 2, 3]
    }
  }],
  ['replicate', {
    text: 'Creates a list of item repeated N times.',
    example: {
      in: [3, 'z', 'replicate', ':'],
      expect: ['z', 'z', 'z']
    }
  }],
  ['eval', {
    text: 'Take a list, where the last element is an function, and apply the '
          + 'function with the rest of the list as its arguments.',
    example: {
      in: [[1, 2, '+'], 'eval', ':'],
      example: 3
    }
  }],
  ['apply', {
    text: 'Apply a function to a list as its arguments.',
    example: {
      in: [[1, 2], '+', 'apply', ':'],
      expect: 3
    }
  }],
  ['succ', {
    text: 'Returns the successor of given number, i.e. x + 1, given x.',
    example: {
      in: [1, 'succ', ':'],
      expect: 2
    }
  }],
  ['compose', {
    text: 'Create a new function by composing them, such that the output of '
          + 'the first would become the input of the second.',
    example: {
      in: [['a', 'b', 'c'], 'length', 'succ', 'compose', ':', ':'],
      expect: 4
    }
  }],
  ['length', {
    text: 'Returns the length of a list.',
    example: {
      in: [['a', 'b', 'c'], 'length', ':'],
      expect: 3
    }
  }],
  ['map', {
    text: 'Apply a function to each element of a list.',
    example: {
      in: [[true, false, true], 'not', 'map', ':'],
      expect: [false, true, false]
    }
  }],
  ['not', {
    text: 'Negates a boolean value.',
    example: {
      in: [true, 'not', ':'],
      expect: false
    }
  }],
  ['flip', {
    text: 'Flips the order in which a binary function takes its arguments.',
    example: {
      in: [1, 2, '-', 'flip', ':', ':'],
      expect: 1
    }
  }],
  ['+', {
    text: 'Adds numbers.'
  }],
  ['-', {
    text: 'Subtracts one number from another.'
  }],
  ['*', {
    text: 'Multiplies two numbers.'
  }],
  ['^', {
    text: 'Takes a number to an exponent.'
  }],
  ['/', {
    text: 'Divides one number by another.'
  }],
  ['%', {
    text: 'Modulo function.'
  }],
  ['and', {
    text: 'Logical AND.'
  }],
  ['or', {
    text: 'Logical inclusive OR.'
  }],
  ['concat', {
    text: 'Joins two lists.',
    example: {
      in: [[1, 2], [3, 4], 'concat', ':'],
      expect: [1, 2, 3, 4]
    }
  }],
  ['reduce', {
    text: 'Applies a binary function to each element in a list, given a '
          + 'starting value (aggregate).',
    example: {
      in: [[1, 2, 3, 4], '+', 0, 'reduce', ':'],
      expect: 10
    }
  }],
  ['zip', {
    text: 'Creates a list of pairs containing the Nth elements from two lists',
    example: {
      in: [[1, 2], ['A', 'B'], 'zip', ':'],
      expect: [[1, 'A'], [2, 'B']]
    }
  }],
  ['id', {
    text: 'Returns its argument unchanged.',
    example: {
      in: [1, 'id', ':'],
      expect: 1
    }
  }],
  ['into', {
    text: 'Applies multiple copies of an argument to a list of functions.',
    example: {
      in: ['a', ['id', 'uppercase'], 'into', ':'],
      expect: ['a', 'A']
    }
  }],
  ['split', {
    text: 'Splits a list into a pair with the of the first element'
          + ' and the rest of the list.',
    example: {
      in: [[2, 44, 1], 'split', ':'],
      expect: [2, [44, 1]]
    }
  }],
  ['uppercase', {
    text: 'Transform an alphabetic character into the uppercase equivalent.',
    expect: {
      in: ['a', 'uppercase', ':'],
      expect: 'A'
    }
  }],
  ['lowercase', {
    text: 'Transform an alphabetic character into the lowercase equivalent.',
    example: {
      in: ['A', 'lowercase', ':'],
      expect: 'a'
    }
  }],
  ['=', {
    text: 'Compare objects for equality',
    example: {
      in: [[], [],'=', ':'],
      expect: true
    }
  }],
  ['filter', {
    text: 'Returns the list of items that meet some criteria.',
    example: {
      in: [[true, false, true], 'not', 'filter', ':'],
      out: [false]
    }
  }],
  ['sum', {
    text: 'Sum a list of numbers.',
    example: {
      in: [[1, 2, 3, 4], 'sum', ':'],
      expect: 10
    }
  }],
  ['curry', {
    text: 'Fills the next argument in a function, returning a function taking '
          + 'one less argument.',
    example: {
      in: [[1, 2], 2, '*', 'curry', ':', 'map', ':'],
      expected: [2, 4]
    }
  }]
]);

export default descriptions;
