import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { addCuisine } from '../store/actions/cuisineActions';

const SideBar = () => {
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
  const dispatch = useDispatch();

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  let cuisines = useSelector((state) => state.cuisines.cuisines);
  cuisines = cuisines.map((cusine) => (
    <MenuItem>
      {cusine.name}
      <Link to={`/cuisines/${cusine.slug}`} />
    </MenuItem>
  ));
  const [show, setShow] = useState(false);
  const [cuisine, setCuisine] = useState({});
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setCuisine({ ...cuisine, img: acceptedFiles[0] });

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
  const handleChange = (event) => {
    setCuisine({ ...cuisine, [event.target.name]: event.target.value });
  };

  const handleClose = () => setShow(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addCuisine(cuisine, history));
    setShow(false);
  };

  const handleShow = () => setShow(true);

  return (
    <div class="side-menu">
      <ProSidebar rtl={true}>
        <Menu iconShape="square">
          <MenuItem>
            <Button onClick={handleShow}>إضافة قسم</Button>
          </MenuItem>

          {cuisines}
        </Menu>
      </ProSidebar>

      <Modal tabindex="-1" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>إضافة قسم</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>اسم القسم</Form.Label>
              <Form.Control
                name="name"
                onChange={(event) => handleChange(event)}
                type="text"
                placeholder="اسم القسم"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>الصورة</Form.Label>
              {/* <Form.Control type="file" placeholder="ارفع الصورة" /> */}
              <section
                className="container"
                style={{
                  width: '300px',
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            إغلاق
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            حفظ القسم
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default SideBar;
