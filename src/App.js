import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import CuisineDetails from './components/CuisineDetails';
import { Route, Switch, Link, NavLink } from 'react-router-dom';

import Home from './components/Home';
import NavBar from './components/NavBar';
import RecipesList from './components/RecipesList';
import AddRecipe from './components/AddRecipe';
import { useSelector } from 'react-redux';
import axios from 'axios';
function App() {
  let recipesData = useSelector((state) => state.recipes.recipes);
  let loading = useSelector((state) => state.recipes.loading);
  let loading2 = useSelector((state) => state.ingCat.loading);
  let loading3 = useSelector((state) => state.ingredients.loading);
  let loading4 = useSelector((state) => state.cuisines.loading);

  recipesData = recipesData.map((recipe) => recipe.id);

  if (loading || loading2 || loading3 || loading4) {
    return <div className="App">Loading...</div>;
  }

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
