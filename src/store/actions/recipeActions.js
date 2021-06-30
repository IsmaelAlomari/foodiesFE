import * as actionTypes from './types';
import axios from 'axios';
export const fetchRecipes = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('http://localhost:8000/recipes');
      dispatch({
        type: actionTypes.FETCH_RECIPES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const addRecipe = (recipe, causineId, ingredients, history) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      for (const key in recipe) formData.append(key, recipe[key]);

      const res = await axios.post(
        `http://localhost:8000/cuisines/${causineId}/createRecipe`,
        formData
      );
      console.log(ingredients);
      await axios.post(
        `http://localhost:8000/recipes/${res.data.id}/createRecipe`,
        {
          ingredients: ingredients.map((i) => i.id),
        }
      );
      res.data.ingredients = ingredients;
      res.data.causineId = causineId;

      dispatch({
        type: actionTypes.ADD_RECIPE,
        payload: res.data,
      });
      history.push('/recipes');
    } catch (error) {
      console.log(error);
    }
  };
};
