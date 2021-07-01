import ingCat from '../../ingCat';
import * as actionTypes from '../actions/types';

const initialState = {
  ingCat: [],
  loading: true,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_INGCATS: {
      return {
        ...state,
        ingCat: action.payload,
        loading: false,
      };
    }
    case actionTypes.ADD_INGREDIENT: {
      let foundedIngCat = state.ingCat.find(
        (ic) => ic.id == action.payload.ingCatId
      );
      console.log(foundedIngCat);

      foundedIngCat.ingredients.push({
        id: action.payload.id,
      });

      let newList = state.ingCat.map((ic) =>
        ic.id === foundedIngCat.id ? foundedIngCat : ic
      );
      return {
        ...state,
        ingCat: newList,
      };
    }
    case actionTypes.ADD_INGCAT: {
      return {
        ...state,
        ingCat: [...state.ingCat, action.payload],
      };
    }

    default:
      return state;
  }
};

export default reducer;
