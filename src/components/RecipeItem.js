import { Card, CardDeck, Button, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import IngredientItem from './IngredientItem';
const RecipeItem = (props) => {
  let ing = props.recipe.ingredients;

  ing = ing.map((ing) => ing.id);
  const ingData = useSelector((state) => state.ingredients.ingredients);
  ing = ing.map((i) => ingData.find((r) => i === r.id));
  ing = ing.map((i) => <IngredientItem ing={i} />);
  return (
    <Col className="container-fluid mt-4">
      <Card style={{ width: '18.9rem' }}>
        <Card.Img
          variant="top"
          className="cuisine-img"
          src={props.recipe.img}
        />
        <Card.Body>
          <Card.Title>{props.recipe.name}</Card.Title>
          :المكونات
          <Card.Text>{ing}</Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </Col>
  );
};
export default RecipeItem;
