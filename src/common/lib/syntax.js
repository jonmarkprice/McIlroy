// Could also make this a Set and then move name to descriptions
const syntax = new Map([
  [':', {name: 'Application operator'}],
  ['[', {name: 'List open'}],
  [']', {name: 'List close'}]
]);

export default syntax;
