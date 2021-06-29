import { useState } from 'react';
import { Badge, Card, CardDeck, Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import RecipeItem from './RecipeItem';
import Checkbox from 'react-custom-checkbox';
const RecipesList = (props) => {
  let recipes = useSelector((state) => state.recipes.recipes).map((r) => r.id);
  let feData = false;
  const [cus, setCus] = useState([]);

  let cuisines = useSelector((state) => state.cuisines.cuisines);
  let searchC = cuisines.find((r) => cus === r.name);
  if (searchC) {
    searchC = searchC.id;
  }

  let showC = cuisines.map((c) => (
    <>
      <Badge className="checkbox" variant="light">
        {c.name}
        <input
          className="checkbox"
          type="checkbox"
          onChange={(value) => {
            if (cus.includes(c.name)) {
              let newArr = cus.filter((e) => e !== c.name);
              setCus(newArr);
            } else {
              setCus([...cus, c.name]);
            }
          }}
        />
      </Badge>
    </>
  ));

  if (props.recipes) {
    recipes = props.recipes;
    feData = true;
  }
  const recipesData = useSelector((state) => state.recipes.recipes);
  recipes = recipes.map((recipe) => recipesData.find((r) => recipe === r.id));
  const [query, setQuery] = useState('');
  const ingData = useSelector((state) => state.ingredients.ingredients);
  let search = ingData.find((r) => query === r.name);
  if (search) {
    search = search.id;
  }
  recipes = recipes.filter(
    (recipe) =>
      recipe.name.includes(query) || recipe.ingredients.includes(search)
  );
  recipes = recipes.map((recipe) => <RecipeItem recipe={recipe} />);

  return (
    <>
      <center>
        <input
          class="form-control mr-sm-2"
          aria-label="Search"
          name="query"
          placeholder="ابحث عن وصفة"
          type="search"
          onChange={(event) => setQuery(event.target.value)}
        ></input>
      </center>

      <br />
      {feData ? '' : <>{showC}</>}

      <Container>
        <CardDeck>{recipes}</CardDeck>
      </Container>
    </>
  );
};
export default RecipesList;
