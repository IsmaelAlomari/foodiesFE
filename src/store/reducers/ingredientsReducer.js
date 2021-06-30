import * as actionTypes from '../actions/types';

const initialState = {
  ingredients: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.payload,
      };
    }
    case actionTypes.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }

    default:
      return state;
  }
};

export default reducer;
