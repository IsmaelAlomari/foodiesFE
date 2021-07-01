import SideBar from './SideBar';
import NavBar from './NavBar';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import IngredientItem from './IngredientItem';
import RecipesList from './RecipesList';
import RecipeItem from './RecipeItem';
import { Helmet } from 'react-helmet';

const Home = () => {
  let recipes = useSelector((state) => state.recipes.recipes);
  recipes = recipes.sort(() => Math.random() - Math.random()).slice(0, 3);
  console.log(recipes.length);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>مطبخ فلاح وبدوي</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <NavBar />
      <SideBar />
      <p style={{ fontSize: '130%', textAlign: 'center' }}>
        {' '}
        <br />
        {/* مرحبا بكم في مطبخ فلاح وبدوي حيث يمكنك ان تختار الوصفة اللذيذة وبإمكانك
        صنع وصفة خاصة بك */}
        صحة الجسم في قلة الطعام ، وصحة النفس في قلة الآثام .. الأولى سيبك منها
      </p>
      <center>
        <p
          style={{
            float: 'center',
            color: '#931A25',

            fontSize: '170%',
          }}
        >
          الوجبات المقترحة
        </p>

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
