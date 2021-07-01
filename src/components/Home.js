import SideBar from './SideBar';
import NavBar from './NavBar';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import IngredientItem from './IngredientItem';
import RecipesList from './RecipesList';
import RecipeItem from './RecipeItem';
const Home = () => {
  let recipes = useSelector((state) => state.recipes.recipes);
  recipes = recipes.sort(() => Math.random() - Math.random()).slice(0, 3);
  console.log(recipes.length);
  return (
    <>
      <NavBar />
      <SideBar />

      <center>
        <h1 style={{ float: 'right' }}>وجبات مقترحة</h1>

        {recipes.length === 3 ? (
          <Carousel style={{ width: '30%' }}>
            <Carousel.Item>
              <RecipeItem recipe={recipes[0]} />
            </Carousel.Item>
            <Carousel.Item>
              <RecipeItem recipe={recipes[1]} />
            </Carousel.Item>
            <Carousel.Item>
              <RecipeItem recipe={recipes[2]} />
            </Carousel.Item>
          </Carousel>
        ) : (
          ''
        )}
      </center>
    </>
  );
};
export default Home;
