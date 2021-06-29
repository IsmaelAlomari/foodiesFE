import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import CuisineDetails from './components/CuisineDetails';
import { Route, Switch, Link, NavLink } from 'react-router-dom';

import Home from './components/Home';
import NavBar from './components/NavBar';
import RecipesList from './components/RecipesList';
import AddRecipe from './components/AddRecipe';
import { useSelector } from 'react-redux';
function App() {
  let recipesData = useSelector((state) => state.recipes.recipes);
  recipesData = recipesData.map((recipe) => recipe.id);

  return (
    <React.Fragment>
      <Switch>
        <Route path="/cuisines/:cuisineSlug">
          <NavBar />
          <CuisineDetails />
        </Route>
        <Route path="/recipes/">
          <NavBar />
          <center>
            <RecipesList />
          </center>
        </Route>
        <Route path="/create-recipe/">
          <NavBar />
          <center>
            <AddRecipe />
          </center>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
