import Badge from 'react-bootstrap/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';
const IngredientItem = (props) => {
  return (
    <>
      <Badge style={{ margin: '5px' }} pill variant={props.ing.calories}>
        <div className="fonttt"> {props.ing.name} </div>
      </Badge>{' '}
    </>
  );
};
export default IngredientItem;
