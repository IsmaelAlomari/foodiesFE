import cuisines from '../../cuisine';
import * as actionTypes from '../actions/types';

const initialState = {
  cuisines: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CUISINES: {
      return {
        ...state,
        cuisines: action.payload,
      };
    }
    case actionTypes.ADD_CUISINE: {
      return {
        ...state,
        cuisines: [...state.cuisines, action.payload],
      };
    }
    case actionTypes.ADD_RECIPE: {
      let foundedCuisine = state.cuisines.find(
        (ic) => ic.id == action.payload.causineId
      );
      console.log(foundedCuisine);

      foundedCuisine.recipes.push({
        id: action.payload.id,
      });

      let newList = state.cuisines.map((ic) =>
        ic.id === foundedCuisine.id ? foundedCuisine : ic
      );
      return {
        ...state,
        cuisines: newList,
      };
    }

    default:
      return state;
  }
};

export default reducer;
