import { Accordion, Card, Button } from 'react-bootstrap';
import IngredientItem from './IngredientItem';

const CategoryCard = ({ category, idx, ingredients, handleClick }) => {
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey={idx}>
          <div className="fonttt">{category.name}</div>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={idx}>
        <Card.Body>
          {category.ingredients?.map((ingredient) => (
            <button onClick={() => handleClick(ingredient)}>
              <IngredientItem
                ing={ingredients.find(
                  (_ingredient) => _ingredient.id === ingredient.id
                )}
              />
            </button>
          ))}
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default CategoryCard;
