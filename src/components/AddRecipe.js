import { useState } from 'react';
import { useSelector } from 'react-redux';
import IngredientItem from './IngredientItem';
import { Form } from 'react-bootstrap';

const { Accordion, Card, Button } = require('react-bootstrap');
const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    ingredients: [],
  });
  const handleClick = (id) => {
    let newIng = [...recipe.ingredients, id];
    setRecipe({ ...recipe, ingredients: newIng });
  };
  const handleChange = (event) => {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };

  const handleDelete = (id) => {
    let arrayOfDuplicites = recipe.ingredients.filter((i) => i === id);
    arrayOfDuplicites.pop();
    let array = recipe.ingredients.filter((i) => i !== id);
    let newIng = [...arrayOfDuplicites, ...array];
    setRecipe({ ...recipe, ingredients: newIng });
  };

  let i = 0;
  let ingCat = useSelector((state) => state.ingCat.ingCat);
  let ingredients = useSelector((state) => state.ingredients.ingredients);
  ingCat = ingCat.map((ic) => {
    i++;

    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey={i}>
            {ic.name}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={i}>
          <Card.Body>
            {ic.ingredients.map((i) => (
              <button onClick={() => handleClick(i)}>
                <IngredientItem ing={ingredients.find((e) => e.id === i)} />
              </button>
            ))}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  });
  return (
    <>
      <div className="accordion">
        <Accordion>{ingCat}</Accordion>
      </div>
      <center>
        <br /> <br />
        <br />
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>المكونات</Card.Title>
            <Card.Text>
              {recipe.ingredients.map((ing) => (
                <button onClick={() => handleDelete(ing)}>
                  <IngredientItem ing={ingredients.find((e) => e.id === ing)} />
                </button>
              ))}
            </Card.Text>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>اسم الطبق</Form.Label>
                <Form.Control
                  name="name"
                  onChange={(event) => handleChange(event)}
                  type="text"
                  placeholder="اسم الطبق"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>الصورة</Form.Label>
                <Form.Control type="file" placeholder="ارفع الصورة" />
              </Form.Group>
              <Button variant="primary">إضافة الطبق</Button>
            </Form>
          </Card.Body>
        </Card>
      </center>
    </>
  );
};
export default AddRecipe;
