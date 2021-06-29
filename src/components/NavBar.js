import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/"> مطبخ فلاح وبدوي </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" style={{ direction: 'rtl' }}>
            <Nav.Link>
              <Link to="/recipes/">وصفات</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/create-recipe/">كتابة وصفة </Link>{' '}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
