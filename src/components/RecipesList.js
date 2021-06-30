import { useState } from 'react';
import { Badge, Card, CardDeck, Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import RecipeItem from './RecipeItem';
const RecipesList = (props) => {
  let recipes = useSelector((state) => state.recipes.recipes);
  let feData = false;
  const [cus, setCus] = useState([]);
  const [query, setQuery] = useState('');

  let cuisines = useSelector((state) => state.cuisines.cuisines);
  let searchC = cuisines.find((r) => cus === r.name);
  if (searchC) {
    searchC = searchC.id;
  }
  const ingData = useSelector((state) => state.ingredients.ingredients);

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
  const search = ingData.find((r) => query === r.name)?.id;

  recipes = recipes.filter(
    (recipe) =>
      recipe.name.includes(query) ||
      recipe.ingredients.map((i) => i.id).includes(search)
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
