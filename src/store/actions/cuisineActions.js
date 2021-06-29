import * as actionTypes from './types';
import axios from 'axios';
export const addCuisine = (cuisine) => {
  return async (dispatch) => {
    try {
      //   const res = await axios.get('http://localhost:8000/products');
      dispatch({
        type: actionTypes.ADD_CUISINE,
        payload: cuisine,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
