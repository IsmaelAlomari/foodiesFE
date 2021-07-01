import { useState } from "react";
import { Badge, Card, CardDeck, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import "@pathofdev/react-tag-input/build/index.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import RecipeItem from "./RecipeItem";
const RecipesList = (props) => {
  let recipes = useSelector((state) => state.recipes.recipes);
  let feData = false;
  const [cus, setCus] = useState([]);
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState(["example tag"]);
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
  const search = tags.map((i) => ingData.find((r) => i === r.name)?.id);
  console.log(search);
  recipes = recipes.filter(
    (recipe) =>
      recipe.name.includes(query) &&
      search.every((r) => recipe.ingredients.map((i) => i.id).includes(r))
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
      <Container>
        <ReactTagInput
          placeholder="اكتب المكونات واضغط Enter"
          className="form-control mr-sm-2"
          style={{ directions: "rtl" }}
          tags={tags}
          onChange={(newTags) => setTags(newTags)}
        />

        <CardDeck>{recipes}</CardDeck>
      </Container>
    </>
  );
};
export default RecipesList;
