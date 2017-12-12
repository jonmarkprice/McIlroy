const DISPLAY = {
  DERIVED: 'DISPLAY::DERIVED',
  PRIMITIVE: 'DISPLAY::PRIMITIVE'
};

const displayPrimitive = name => 
  ({type: DISPLAY.PRIMITIVE, name});

const displayDerived = (id, name) =>
  ({type: DISPLAY.DERIVED, id, name});

module.exports = {
  DISPLAY
  , displayPrimitive
  , displayDerived
};
