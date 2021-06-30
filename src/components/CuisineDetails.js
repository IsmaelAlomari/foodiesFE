import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import RecipesList from './RecipesList';
const CuisineDetails = () => {
  const { cuisineSlug } = useParams();
  const cuisines = useSelector((state) => state.cuisines.cuisines);
  const recepies = useSelector((state) => state.recipes.recipes);
  const cuisine = cuisines.find((cuisine) => cuisine.slug === cuisineSlug);
  return (
    <>
      <center>
        {cuisine.name}
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
