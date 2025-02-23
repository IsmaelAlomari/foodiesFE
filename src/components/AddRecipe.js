import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';

import { Button, Modal } from 'react-bootstrap';
import { addIngCat } from '../store/actions/ingCatActions';
import { addIngredient } from '../store/actions/ingredientActions';
import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { addRecipe } from '../store/actions/recipeActions';
import { useHistory } from 'react-router-dom';
import IngredientItem from './IngredientItem';
import useSound from 'use-sound';
import mansaf from '../mansaf.mp3';
import Fuse from 'fuse.js';
import { Helmet } from 'react-helmet';

import CategoryCard from './CategoryCard';
import { Accordion, Card } from 'react-bootstrap';

const AddRecipe = () => {
  const [play] = useSound(mansaf);
  const history = useHistory();
  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  };

  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
  };

  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
  };

  const img = {
    display: 'block',
    width: 'auto',
    height: '100%',
  };
  const [files, setFiles] = useState([]);
  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setRecipe({ ...recipe, img: acceptedFiles[0] });

      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const [recipe, setRecipe] = useState({
    ingredients: [],
  });
  const [catIng, setCatIng] = useState({});
  const [ing, setIng] = useState({});
  let ingredients = useSelector((state) => state.ingredients.ingredients);

  const handleClick = (id) => {
    if (
      ingredients.find((ing) => ing.id === id.id)?.name === 'دجاج' &&
      recipe.name === 'منسف'
    ) {
      play();
      console.log('منسف عجاج ما ينفع اردنية');
    } else {
      let newIng = [...recipe.ingredients, id];
      setRecipe({ ...recipe, ingredients: newIng });
    }
  };
  const handleChange = (event) => {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };
  const handleChangeAddCatIng = (event) => {
    setCatIng({ ...catIng, [event.target.name]: event.target.value });
  };
  const handleChangeAddIng = (event) => {
    setIng({ ...ing, [event.target.name]: event.target.value });
  };

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [query, setQuery] = useState('');

  const handleClose = () => {
    setShow(false);
  };
  const handleClose2 = () => {
    setShow2(false);
  };

  const handleAddCatIng = () => {
    dispatch(addIngCat(catIng));
    handleClose();
  };
  const handleAddRecipe = () => {
    dispatch(
      addRecipe(
        {
          name: recipe.name,
          img: recipe.img,
        },
        recipe.cuisine,
        recipe.ingredients,
        history
      )
    );
  };

  const handleAddIng = () => {
    dispatch(
      addIngredient(
        {
          name: ing.name,
          calories: ing.calories,
        },
        ing.ingCat
      )
    );
    handleClose2();
  };

  const handleDelete = (id) => {
    let arrayOfDuplicites = recipe.ingredients.filter((i) => i === id);
    arrayOfDuplicites.pop();
    let array = recipe.ingredients.filter((i) => i !== id);
    let newIng = [...arrayOfDuplicites, ...array];
    setRecipe({ ...recipe, ingredients: newIng });
  };

  let i = 0;
  let categories = useSelector((state) => state.ingCat.ingCat);
  let cuisines = useSelector((state) => state.cuisines.cuisines);

  const fuse = new Fuse(ingredients, {
    keys: ['name'],
    minMatchCharLength: 4,
  });
  const results = fuse.search(query);
  const ingCatList = categories.map((category, idx) => (
    <CategoryCard
      category={category}
      idx={idx + 1}
      key={category.id}
      ingredients={ingredients}
      handleClick={handleClick}
    />
  ));
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>إضافة وصفة</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <Button
        className="btn btn-secondary"
        style={{
          float: 'right',
          marginTop: '5px',
          marginRight: '15px',
        }}
        onClick={() => setShow(true)}
      >
        إضافة تصنيف
      </Button>

      <Button
        className="btn btn-secondary "
        style={{
          float: 'right',
          marginRight: '10px',
          marginTop: '5px',
        }}
        onClick={() => setShow2(true)}
      >
        إضافة مكون
      </Button>

      <div className="accordion">
        <Accordion>{ingCatList}</Accordion>
      </div>
      <center>
        <br /> <br />
        <br />
        <Card className="yameen" style={{ width: '22rem' }}>
          <Card.Body>
            <Card.Title
              style={{
                fontWeight: 'bold',
                fontSize: '30px',
              }}
            >
              المكونات
            </Card.Title>
            <Card.Text>
              {recipe.ingredients.map((ingredient) => (
                <button
                  key={ingredient.id}
                  onClick={() => handleDelete(ingredient)}
                >
                  <IngredientItem
                    ing={ingredients.find(
                      (_ingredient) => _ingredient.id === ingredient.id
                    )}
                  />
                </button>
              ))}
            </Card.Text>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label
                  style={{
                    float: 'right',
                    fontSize: '25px',
                  }}
                >
                  اسم الطبق
                </Form.Label>
                <Form.Control
                  name="name"
                  onChange={handleChange}
                  type="text"
                  placeholder="اسم الطبق"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    float: 'right',
                    fontSize: '20px',
                  }}
                >
                  الصورة
                </Form.Label>
                {/* <Form.Control type="file" placeholder="ارفع الصورة" /> */}
                <section
                  className="container"
                  style={{
                    textAlign: 'center',
                    width: '50%',
                    backgroundColor: 'lightgrey',
                    marginTop: '10px',
                  }}
                >
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>اسحب وضع الصورة هنا أو اضغط لاختيار صورة</p>
                  </div>
                  <aside style={thumbsContainer}>{thumbs}</aside>
                </section>
              </Form.Group>
              <Form.Group>
                <label style={{ float: 'right' }} for="cars">
                  &nbsp;التصنيف&nbsp;&nbsp;
                </label>
                <select
                  style={{ width: '50px' }}
                  name="cuisine"
                  id="cuisine"
                  onChange={handleChange}
                >
                  <option value="default">اختر</option>

                  {cuisines.map((cuisine) => (
                    <option key={cuisine.id} value={cuisine.id}>
                      {cuisine.name}
                    </option>
                  ))}
                </select>
              </Form.Group>
              <center>
                {' '}
                <Button variant="success" onClick={handleAddRecipe}>
                  إضافة الطبق
                </Button>
              </center>
            </Form>
          </Card.Body>
        </Card>
      </center>

      {/* Add ingCat modal */}
      <Modal
        className="yameen"
        tabindex="-1"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header
          style={{ flexDirection: 'row', direction: 'ltr' }}
          closeButton
        >
          <Modal.Title>إضافة تصنيف</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ float: 'right' }}>اسم التصنيف</Form.Label>
              <Form.Control
                name="name"
                onChange={(event) => handleChangeAddCatIng(event)}
                type="text"
                placeholder="اسم التصنيف"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            إغلاق
          </Button>
          <Button variant="success" onClick={handleAddCatIng}>
            إضافة التصنيف
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Add ing modal */}
      <Modal
        className="yameen"
        tabindex="-1"
        centered
        show={show2}
        onHide={handleClose2}
      >
        <Modal.Header
          style={{ flexDirection: 'row', direction: 'ltr' }}
          closeButton
        >
          <Modal.Title
            style={{
              flexDirection: 'row',
              direction: 'rtl',
            }}
          >
            إضافة مكون
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ float: 'left' }}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ float: 'right' }}>اسم المكون</Form.Label>
              <Form.Control
                name="name"
                onChange={(event) => {
                  handleChangeAddIng(event);
                  setQuery(event.target.value);
                }}
                type="text"
                placeholder="اسم المكون"
              />
              {results ? (
                <>
                  {results.map((r) => (
                    <>
                      <p>
                        المكون <IngredientItem ing={r.item} />
                      </p>
                      <p>
                        موجود في تصنيف{' '}
                        <Badge style={{ margin: '5px' }} pill variant="success">
                          <div className="fonttt">
                            {' '}
                            {
                              categories.find((i) => i.id === r.item.ingCatId)
                                ?.name
                            }{' '}
                          </div>
                        </Badge>{' '}
                      </p>
                    </>
                  ))}
                </>
              ) : (
                ''
              )}
            </Form.Group>
            <Form.Group>
              <label for="cars" style={{ float: 'right' }}>
                &nbsp;&nbsp;التصنيف&nbsp;&nbsp;
              </label>

              <select
                style={{ float: 'right' }}
                name="ingCat"
                id="ingCat"
                onChange={(event) => handleChangeAddIng(event)}
              >
                <option value="default">اختر</option>

                {categories.map((ic) => (
                  <option value={ic.id}>{ic.name}</option>
                ))}
              </select>
            </Form.Group>
            <Form.Group>
              <label for="cars">&nbsp;&nbsp;السعرات&nbsp;&nbsp;</label>

              <select
                name="calories"
                id="calories"
                onChange={(event) => handleChangeAddIng(event)}
              >
                <option value="default">اختر</option>

                <option value="success">قليل السعرات</option>
                <option value="warning">متوسط السعرات</option>
                <option value="danger">عالي السعرات</option>
              </select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            إغلاق
          </Button>
          <Button variant="success" onClick={() => handleAddIng()}>
            إضافة المكون
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddRecipe;
