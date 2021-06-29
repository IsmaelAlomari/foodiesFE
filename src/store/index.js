import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import cuisineReducer from './reducers/cuisineReducer';
import recipesReducer from './reducers/recipesReducer';
import ingredientsReducer from './reducers/ingredientsReducer';
import ingCatReducer from './reducers/ingCatReducer';

// import { fetchProducts } from './actions/productsActions';
// import { fetchShops } from './actions/shopsActions';

const rootReducer = combineReducers({
  cuisines: cuisineReducer,
  recipes: recipesReducer,
  ingredients: ingredientsReducer,
  ingCat: ingCatReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
// store.dispatch(fetchProducts());
// store.dispatch(fetchShops());

export default store;
