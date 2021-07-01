import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import RecipesList from './RecipesList';
import Badge from 'react-bootstrap/Badge';
import { Helmet } from 'react-helmet';

const CuisineDetails = () => {
  const { cuisineSlug } = useParams();
  const cuisines = useSelector((state) => state.cuisines.cuisines);
  const recepies = useSelector((state) => state.recipes.recipes);
  const cuisine = cuisines.find((cuisine) => cuisine.slug === cuisineSlug);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{cuisine.name}</title>
      </Helmet>
      <center>
        <Badge style={{ margin: '10px', fontSize: '20px' }} variant="secondary">
          <div className="fonttt">{cuisine.name}</div>
        </Badge>{' '}
        <br />
        <img className="cuisine-img" src={cuisine.img} />
        <br />
        <RecipesList
          recipes={cuisine.recipes.map((i) =>
            recepies.find((_i) => _i.id === i.id)
          )}
        />
      </center>
    </>
  );
};
export default CuisineDetails;
