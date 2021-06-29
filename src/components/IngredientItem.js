import Badge from 'react-bootstrap/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';
const IngredientItem = (props) => {
  return (
    <>
      <Badge pill variant={props.ing.calories}>
        {props.ing.name}{' '}
      </Badge>{' '}
    </>
  );
};
export default IngredientItem;
