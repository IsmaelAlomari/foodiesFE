import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import cuisineReducer from './reducers/cuisineReducer';
import recipesReducer from './reducers/recipesReducer';
import ingredientsReducer from './reducers/ingredientsReducer';
import ingCatReducer from './reducers/ingCatReducer';

// import { fetchProducts } from './actions/productsActions';
import { fetchCuisines } from './actions/cuisineActions';
import { fetchRecipes } from './actions/recipeActions';
import { fetchIngredients } from './actions/ingredientActions';
import { fetchIngCats } from './actions/ingCatActions';

const rootReducer = combineReducers({
  cuisines: cuisineReducer,
  recipes: recipesReducer,
  ingredients: ingredientsReducer,
  ingCat: ingCatReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
store.dispatch(fetchRecipes());
store.dispatch(fetchCuisines());
store.dispatch(fetchIngredients());
store.dispatch(fetchIngCats());

export default store;
