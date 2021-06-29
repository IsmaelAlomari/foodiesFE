import recipes from '../../recipes';
const initialState = {
  recipes: recipes,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
