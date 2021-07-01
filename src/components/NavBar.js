import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const NavBar = () => {
  return (
    <Navbar bg="dark" inverse fluid pullRight expand="lg">
      <Container>
        {' '}
        <img
          style={{ float: 'left' }}
          src="https://media.discordapp.net/attachments/844686008914411520/859956031178276874/logo.png?width=658&height=669"
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
        <Navbar.Brand>
          <Link
            style={{
              float: 'left',

              fontWeight: 'bold',
            }}
            to="/"
          >
            <button class="btn btn-secondary"> مطبخ فلاح وبدوي{''}</button>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link>
              <Link
                style={{
                  fontWeight: 'bold',
                }}
                to="/recipes/"
              >
                <button class="btn btn-secondary"> وصفات</button>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link style={{ fontWeight: 'bold' }} to="/create-recipe/">
                <button class="btn btn-secondary"> كتابة وصفة</button>{' '}
              </Link>{' '}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
