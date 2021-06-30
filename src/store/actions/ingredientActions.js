import * as actionTypes from './types';
import axios from 'axios';
export const fetchIngredients = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('http://localhost:8000/ingredients');
      dispatch({
        type: actionTypes.FETCH_INGREDIENTS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const addIngredient = (ing, ingCatId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/ingcat/${ingCatId}/createIngredient`,
        ing
      );
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
