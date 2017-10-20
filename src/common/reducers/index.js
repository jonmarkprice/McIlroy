// TODO move this to common/reducers or similar
const reducer = (state = "world!", action) => {
  switch (action.type) {
    case 'TO_REACT':
      return 'React!';
    default:
      return state;
  }
}

export default reducer;
