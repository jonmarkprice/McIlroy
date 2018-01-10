const R = require('ramda');
const { dissoc, compose, set, over, lensProp, pipe } = R;
const { PROGRAM } = require('../actions/saved');

const dbg = require('../dbgconf')('reducers:saved');

const initialState = {
  next_id: 0,
  programs: {}
};

const program = id => R.lensPath(['programs', id]);

function savedReducer(state = initialState, action) {
  let lens;
  const nextSaveSlot = R.lensPath(['programs', state.next_id]);
  const uiIndex = R.lensProp('next_id');

  switch (action.type) {
    // Saved (subreducer)
    case PROGRAM.ADD:
      // XXX: I don't like that we are using IDs here over maps...
      // what was the reasoning behind that?
      // I wanted to be able to delete... but not use an object as a map -- oh!
      // because the *name* is editable, so I needed a unique identifier, and it
      // couldn't be the name. But I also couldn't rely on indexes staying where
      // they were, so I needed to record the id in the data itself.

      // Actually, why not just use a simple list and append to it?
      // const nextId = R.lensPath(['saved', );
      return R.pipe(
        R.set(nextSaveSlot, {
          name: action.name,
          program : action.expansion,
          id      : state.next_id
        }),
        R.over(uiIndex, R.inc)
      )(state);

    case PROGRAM.REMOVE:
      // remove a program from the GUI (after server complete)
      lens = lensProp('programs');
      return over(lens, dissoc(R.toString(action.id)), state);
    
    case PROGRAM.UPDATE:
      dbg('PROGRAM.UPDATE: action %o', action);
      lens = program(action.id);
      const updated = pipe(
        set(compose(lens, lensProp('name')), action.name),
        set(compose(lens, lensProp('program')), action.expansion)
      )(state);
      
      dbg("CURRENT: %o",   state.programs[action.id].program);
      dbg("UPDATED: %o", updated.programs[action.id].program);
      dbg("full state:");
      dbg(updated);

      return updated;
  
    case PROGRAM.UI.DISABLE:
      dbg("Editing disabled.")
      return state;
    case PROGRAM.UI.ENABLE:
      dbg("Editing enabled.")
      return state;

    default:
      dbg(`In savedReducer. Reached default state on ${action.type}.`);
      return state;
  }
}

module.exports = savedReducer;
