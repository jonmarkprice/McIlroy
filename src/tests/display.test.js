import display from '../common/lib/display';

describe('Display', () => {
  it('should print characters with quotes.', () => {
    expect(display("a")).toEqual("'a'");
  });

  it('should print special tokens without quotes', () => {
    expect(display(":")).toEqual(":");
  });

  it('should recursively display lists');

  it('should use the display (property) of on object.');
});
