import {
  Container,
  Navbar,
  NavDropdown,
  Nav,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/NavbarGuitar.css"

function NavbarGuitar() {
  return (
    <Navbar expand="lg" variant="light" className="fixed-top shadow">
      <Container fluid>
        <Navbar.Brand className="logoFont" as={Link} to="/">ChitCraft</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 generalFont"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Gamma</Nav.Link>
            <NavDropdown title="Prodotti" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarGuitar;
