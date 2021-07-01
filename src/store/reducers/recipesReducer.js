import recipes from '../../recipes';
import * as actionTypes from '../actions/types';

const initialState = {
  recipes: [],
  loading: true,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_RECIPES: {
      return {
        ...state,
        recipes: action.payload,
        loading: false,
      };
    }

    case actionTypes.ADD_RECIPE: {
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    }

    default:
      return state;
  }
};

export default reducer;
