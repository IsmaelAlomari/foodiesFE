import * as actionTypes from './types';
import axios from 'axios';
export const fetchIngCats = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('http://localhost:8000/ingcat/');
      dispatch({
        type: actionTypes.FETCH_INGCATS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const addIngCat = (ingCat) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`http://localhost:8000/ingcat`, ingCat);
      res.data.ingredients = [];
      dispatch({
        type: actionTypes.ADD_INGCAT,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
