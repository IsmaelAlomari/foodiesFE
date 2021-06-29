import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
const SideBar = () => {
  let cuisines = useSelector((state) => state.cuisines.cuisines);
  cuisines = cuisines.map((cusine) => (
    <MenuItem>
      {cusine.name}
      <Link to={`/cuisines/${cusine.slug}`} />
    </MenuItem>
  ));
  const [show, setShow] = useState(false);
  const [cuisine, setCuisine] = useState({});

  const handleClose = () => setShow(false);
  const handleSubmit = () => setShow(false);

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
              <Form.Label name="name">اسم القسم</Form.Label>
              <Form.Control type="text" placeholder="اسم القسم" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>الصورة</Form.Label>
              <Form.Control type="file" placeholder="ارفع الصورة" />
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
