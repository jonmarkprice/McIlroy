export const equal = (x, y) => {
  if (Array.isArray(x) && Array.isArray(y)) {
    if (x.length === y.length) {
      for (let i = 0; i < x.length; i++) {
        if (! equal(x[i], y[i])) return false;
      }
      return true;
    }
    else return false;
  }
  else return x === y;
}
