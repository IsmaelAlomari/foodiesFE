import * as actionTypes from './types';
import axios from 'axios';
export const addCuisine = (cuisine, history) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      for (const key in cuisine) formData.append(key, cuisine[key]);

      const res = await axios.post(`http://localhost:8000/cuisines`, formData);
      history.push('/');

      dispatch({
        type: actionTypes.ADD_CUISINE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchCuisines = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('http://localhost:8000/cuisines');
      dispatch({
        type: actionTypes.FETCH_CUISINES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
