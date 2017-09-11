const display = (obj) => {
  if (Array.isArray(obj)) {
    // If list is empty
    if (obj.length === 0) {
      return '[ ]';
    }
    // For singleton lists
    else if (obj.length === 1) {
      return '[' + display(obj[0]) + ']';
    }
    // For lists of length two or greater
    else {
      const lastIndex = obj.length - 1;
      return obj.reduce((agg, elem, index) => {
        if (agg === '') {
          // For first item
          return '[' + display(elem);
        }
        else if (index === lastIndex) {
          // For last item
          return agg + ', ' + display(elem) + ']';
        }
        else {
          return agg + ', ' + display(elem);
        }
      }, '');
    }
  }
  else if (typeof obj === 'object') {
    if (obj.hasOwnProperty('wraps')) {
      const data = obj.wraps.data ? obj.wraps.data + ' ' : '';
      return `(${data}${obj.wraps.name} ${obj.name})`;
    }
    else {
      return obj.name;
    }
  }
  else {
    return obj.toString();
  }
}

export default display;
